-- Analytics RPCs. All functions are `security invoker` so RLS on the
-- underlying tables (transactions, categories) still scopes results to the
-- calling user.

-- Category breakdown for a date range (expenses only).
-- Returns one row per category with absolute total, count, and share of total.
create or replace function public.category_breakdown(
  period_from timestamptz default null,
  period_to timestamptz default null
)
returns table (
  category text,
  total numeric,
  count bigint,
  percentage numeric
)
language sql
security invoker
stable
set search_path = public
as $$
  with filtered as (
    select t.amount, coalesce(c.label, 'other') as label
    from public.transactions t
    left join public.categories c on c.id = t.category_id
    where t.type = 'expense'
      and (period_from is null or t.transaction_date >= period_from)
      and (period_to is null or t.transaction_date <= period_to)
  ),
  totals as (
    select label, sum(amount)::numeric as total, count(*)::bigint as count
    from filtered
    group by label
  ),
  grand as (
    select coalesce(sum(total), 0) as grand_total from totals
  )
  select
    t.label as category,
    t.total,
    t.count,
    case when (select grand_total from grand) > 0
      then (t.total / (select grand_total from grand)) * 100
      else 0
    end as percentage
  from totals t
  order by t.total desc;
$$;

-- Daily expense totals across a date range, with a row for every day
-- in the range (zero when no spending). Nulls for period bounds fall back to
-- the user's earliest transaction and end-of-today.
create or replace function public.daily_spending(
  period_from timestamptz default null,
  period_to timestamptz default null
)
returns table (
  day date,
  expense numeric
)
language sql
security invoker
stable
set search_path = public
as $$
  with bounds as (
    select
      coalesce(
        period_from,
        (select min(transaction_date) from public.transactions where type = 'expense'),
        date_trunc('day', now())
      ) as f,
      coalesce(
        period_to,
        date_trunc('day', now()) + interval '1 day' - interval '1 second'
      ) as t
  ),
  day_series as (
    select generate_series(
      date_trunc('day', (select f from bounds)),
      date_trunc('day', (select t from bounds)),
      interval '1 day'
    )::date as day
  ),
  daily_totals as (
    select date_trunc('day', t.transaction_date)::date as day,
           sum(t.amount)::numeric as expense
    from public.transactions t, bounds b
    where t.type = 'expense'
      and t.transaction_date >= b.f
      and t.transaction_date <= b.t
    group by 1
  )
  select s.day, coalesce(d.expense, 0)::numeric as expense
  from day_series s
  left join daily_totals d on d.day = s.day
  order by s.day asc;
$$;

-- Monthly totals across the last N months, with a row for every month
-- in the window (zero when no activity).
create or replace function public.monthly_trend(
  months_back integer default 6
)
returns table (
  month date,
  income numeric,
  expense numeric,
  net numeric
)
language sql
security invoker
stable
set search_path = public
as $$
  with bounds as (
    select
      date_trunc('month', now())::date - make_interval(months => months_back - 1) as start_month,
      date_trunc('month', now())::date + interval '1 month' - interval '1 second' as end_ts
  ),
  month_series as (
    select generate_series(
      (select start_month from bounds),
      (select start_month + make_interval(months => months_back - 1) from bounds),
      interval '1 month'
    )::date as month
  ),
  monthly_totals as (
    select date_trunc('month', t.transaction_date)::date as month,
           coalesce(sum(case when t.type = 'income' then t.amount end), 0)::numeric as income,
           coalesce(sum(case when t.type = 'expense' then t.amount end), 0)::numeric as expense
    from public.transactions t, bounds b
    where t.transaction_date >= b.start_month
      and t.transaction_date <= b.end_ts
    group by 1
  )
  select s.month,
         coalesce(m.income, 0) as income,
         coalesce(m.expense, 0) as expense,
         coalesce(m.income, 0) - coalesce(m.expense, 0) as net
  from month_series s
  left join monthly_totals m on m.month = s.month
  order by s.month asc;
$$;

-- Period comparison: totals for a current range and an optional previous range.
-- Returns a single row; has_previous is false when previous_from/previous_to
-- are null.
create or replace function public.period_comparison(
  current_from timestamptz default null,
  current_to timestamptz default null,
  previous_from timestamptz default null,
  previous_to timestamptz default null
)
returns table (
  current_income numeric,
  current_expense numeric,
  current_net numeric,
  previous_income numeric,
  previous_expense numeric,
  previous_net numeric,
  has_previous boolean
)
language sql
security invoker
stable
set search_path = public
as $$
  with cur as (
    select
      coalesce(sum(case when type = 'income' then amount end), 0)::numeric as income,
      coalesce(sum(case when type = 'expense' then amount end), 0)::numeric as expense
    from public.transactions
    where (current_from is null or transaction_date >= current_from)
      and (current_to is null or transaction_date <= current_to)
  ),
  prev as (
    select
      coalesce(sum(case when type = 'income' then amount end), 0)::numeric as income,
      coalesce(sum(case when type = 'expense' then amount end), 0)::numeric as expense
    from public.transactions
    where previous_from is not null
      and previous_to is not null
      and transaction_date >= previous_from
      and transaction_date <= previous_to
  )
  select
    cur.income,
    cur.expense,
    (cur.income - cur.expense),
    prev.income,
    prev.expense,
    (prev.income - prev.expense),
    (previous_from is not null and previous_to is not null)
  from cur, prev;
$$;
