# MVP Features - Expense Tracker SaaS

## 🏷️ **Branding & App Name**

### Recommended App Name: **FlowSpend**

**Rationale:**

- **Flow** suggests smooth, effortless money management
- **Spend** clearly indicates expense tracking
- Modern, memorable, and easy to pronounce
- Short enough for branding and domain purposes
- Works well for both mobile app and web platform

**Alternative Names:**

- **Spendwise** - Emphasizes smart spending decisions
- **TrackFlow** - Focuses on tracking with flow
- **ExpenseFlow** - More explicit about expense tracking
- **FinFlow** - Shorter, finance-focused
- **MoneyFlow** - Simple and direct

**Tagline Options:**

- "Track your money, control your flow"
- "Where your money flows, we track"
- "Smart spending, effortless tracking"
- "Your money, your flow, your control"

---

## Overview

This document outlines all features needed to transform the minimal expense tracker into a modern, mobile-first SaaS application.

---

## 🎨 **1. Landing Page & Marketing**

### 1.1 Hero Section

- [x] Eye-catching hero section with gradient background
- [x] Compelling headline and subheadline
- [x] Primary CTA button (Get Started / Sign Up)
- [ ] Secondary CTA button (Learn More / View Demo)
- [x] Hero image or illustration (expense tracking visualization)
- [ ] Trust indicators (e.g., "Trusted by X users", testimonials count)

### 1.2 Features Section

- [x] Grid layout showcasing key features
- [x] Feature cards with icons and descriptions:
  - Real-time expense tracking
  - Income/Expense analytics
  - Category management
  - Mobile-first design
  - Secure & private
- [ ] Hover effects and animations _(partial: basic shadow on hover, no richer motion)_

### 1.3 Social Proof Section

- [ ] Testimonials carousel
- [ ] User statistics (total transactions tracked, users, etc.)
- [ ] Trust badges or partner logos (optional)

### 1.4 Pricing Section (Future-ready)

- [ ] Pricing tiers layout (Free, Pro, Enterprise)
- [ ] Feature comparison table
- [ ] CTA buttons for each tier

### 1.5 Footer

- [ ] Links to important pages (About, Privacy, Terms, Contact)
- [ ] Social media links
- [x] Copyright information
- [ ] Newsletter signup (optional)

### 1.6 Header/Navigation

- [x] Sticky navigation bar
- [x] Logo/brand name
- [x] Navigation links (Features, How It Works) _(Pricing/About not present)_
- [x] Sign In / Sign Up buttons
- [x] Mobile hamburger menu

---

## 📱 **2. Mobile-First Design & Navigation**

### 2.1 Bottom Navigation Bar (Mobile)

- [x] Fixed bottom navigation bar (visible on mobile/tablet)
- [ ] Navigation icons with labels:
  - [x] Home/Dashboard (house icon)
  - [x] Transactions (ArrowLeftRight icon)
  - [ ] Add Transaction (plus icon - prominent/fab style) _(FAB exists but lives outside the nav bar)_
  - [x] Analytics/Insights (chart icon)
  - [x] Profile/Settings (user icon)
- [x] Active state indicators
- [x] Smooth transitions between pages
- [x] Hide on desktop (or show as sidebar)

### 2.2 Responsive Layout

- [x] Mobile-first breakpoints
- [ ] Tablet optimization _(no specific tablet treatment)_
- [x] Desktop layout (sidebar or top nav)
- [ ] Fluid typography scaling
- [x] Touch-friendly button sizes (min 44x44px)

### 2.3 Mobile Sheet Component

- [x] Bottom sheet for adding transactions (mobile)
- [x] Smooth slide-up animation
- [x] Backdrop overlay with blur
- [x] Swipe-to-dismiss functionality _(via vaul defaults)_
- [x] Form fields optimized for mobile input
- [x] Category picker in sheet
- [x] Date picker integration
- [ ] Keyboard-aware scrolling

---

## 💰 **3. Transaction Management**

### 3.1 Enhanced Transaction Form

- [x] Category selection (dropdown/picker)
- [x] Date picker (default to today, allow past dates)
- [x] Description/Notes field
- [x] Amount input with currency formatting
- [x] Transaction type toggle (Income/Expense)
- [ ] Recurring transaction option (future)
- [ ] Receipt/image upload (future)
- [ ] Tags/labels support (future)

### 3.2 Transaction List Improvements

- [x] Group transactions by date (Today, Yesterday, This Week, etc.)
- [x] Search/filter functionality
- [x] Sort options (date, amount, category)
- [x] Category filter chips
- [ ] Pull-to-refresh (mobile)
- [x] Infinite scroll or pagination _(cursor-based, 30 per page, "Load more" button; server-side filter/sort/search)_
- [x] Empty state with illustration
- [x] Transaction item swipe actions (edit/delete on mobile) _(buttons rather than swipe gesture)_

### 3.3 Transaction Details

- [x] View/edit transaction modal/page
- [x] Delete confirmation dialog
- [ ] Transaction history/audit trail

---

## 📊 **4. Analytics & Insights**

### 4.1 Dashboard Overview

- [x] Total balance card (with trend indicator)
- [x] Income vs Expense comparison
- [x] Monthly/weekly summary cards
- [ ] Quick stats (transactions count, average transaction, etc.) _(removed during cleanup; can re-add if useful)_

### 4.2 Charts & Visualizations

- [x] Expense breakdown by category (pie/donut chart)
- [x] Income vs Expense over time (line/bar chart)
- [x] Monthly spending trends
- [x] Category spending comparison
- [x] Interactive charts (hover for details)

### 4.3 Insights & Recommendations

- [x] Spending alerts (e.g., "You're spending 20% more this month") _(period-over-period delta on PeriodSummary)_
- [ ] Budget suggestions (future)
- [x] Top spending categories _(donut legend, sorted desc with percentages)_
- [ ] Savings opportunities

---

## 🎯 **5. Categories & Organization**

### 5.1 Category Management

- [x] Default categories (Food, Transport, Entertainment, Bills, etc.)
- [x] Custom category creation _(per-user, validated against default labels and per-user uniqueness)_
- [x] Category icons/colors _(defaults keep their styling; custom categories use a generic Tag + slate badge)_
- [x] Category editing/deletion _(deletion only; editing deferred — re-add with a new label)_
- [x] Category usage statistics _(donut + legend show share per category)_

### 5.2 Category UI

- [x] Category picker component
- [x] Visual category indicators in transaction list
- [x] Category filter in transactions view

---

## 👤 **6. User Profile & Settings**

### 6.1 Profile Page

- [x] User avatar display
- [x] User information (name, email)
- [x] Account statistics _(transaction count, lifetime income/expense, balance)_
- [x] Member since date _(from Clerk user.createdAt)_

### 6.2 Settings

- [ ] Currency selection
- [ ] Date format preferences
- [x] Theme toggle (light/dark mode) _(Light / Dark / System via next-themes)_
- [ ] Notification preferences
- [x] Export data (CSV/JSON) _(CSV implemented; JSON pending)_
- [x] Account deletion _(double-confirm, deletes Prisma data + Clerk user)_
- [ ] Privacy settings

---

## 🎨 **7. UI/UX Enhancements**

### 7.1 Design System

- [x] Consistent color palette
- [x] Typography scale
- [x] Spacing system
- [x] Component library (using shadcn/ui)
- [x] Icon system (lucide-react)

### 7.2 Animations & Transitions

- [x] Page transitions _(motion library on landing)_
- [x] Loading states (skeletons) _(per-card Suspense + skeleton fallbacks on dashboard, transactions, analytics, profile)_
- [x] Success/error animations _(toast feedback via Sonner)_
- [x] Micro-interactions (button hover, card hover)
- [x] Smooth scrolling

### 7.3 Loading States

- [x] Skeleton loaders for data fetching
- [x] Loading spinners _(Load more, Import, Delete confirmations)_
- [ ] Progress indicators
- [ ] Optimistic UI updates

### 7.4 Error Handling

- [x] Error boundaries _(server actions return error strings, UI displays them)_
- [x] User-friendly error messages
- [ ] Retry mechanisms
- [ ] Offline state handling

---

## 🔔 **8. Notifications & Feedback**

### 8.1 Toast Notifications

- [x] Success notifications (transaction added, deleted, etc.)
- [x] Error notifications
- [x] Info notifications
- [x] Position customization (already using sonner)

### 8.2 In-App Notifications (Future)

- [ ] Notification center
- [ ] Unread indicators
- [ ] Notification preferences

---

## 🔒 **9. Security & Privacy**

### 9.1 Data Protection

- [x] Secure authentication (Clerk - already implemented)
- [x] Data encryption _(handled by Clerk + Postgres)_
- [ ] Privacy policy page
- [ ] Terms of service page

### 9.2 User Data

- [x] Data export functionality _(CSV)_
- [x] Account deletion with data removal
- [ ] GDPR compliance considerations

---

## 🚀 **10. Performance & Optimization**

### 10.1 Performance

- [x] Image optimization _(next/image)_
- [x] Code splitting _(Next.js automatic)_
- [ ] Lazy loading
- [x] Database query optimization _(getTransactions paginated; getKPIs uses SQL aggregates)_
- [ ] Caching strategies

### 10.2 SEO

- [x] Meta tags optimization
- [x] Open Graph tags
- [ ] Structured data
- [ ] Sitemap generation

---

## 📦 **11. Additional SaaS Features**

### 11.1 Onboarding

- [x] Welcome tour for new users _(3-screen modal on first dashboard visit, dismissible, replayable from /profile)_
- [x] First transaction guide _(empty-state CTA on dashboard opens the add-transaction modal)_
- [ ] Feature discovery tooltips

### 11.2 Export & Import

- [x] Export transactions to CSV
- [x] Export transactions to PDF (receipt format) _(statement layout via @react-pdf/renderer)_
- [x] Import transactions from CSV

### 11.3 Search Functionality

- [ ] Global search bar
- [x] Search by description, category, amount _(within transactions list)_
- [ ] Search history (future)

### 11.4 Dark Mode

- [x] Theme toggle _(Light / Dark / System on /profile)_
- [x] System preference detection _(via next-themes)_
- [x] Smooth theme transitions _(via Tailwind transitions; flash prevented by suppressHydrationWarning)_

### 11.5 Accessibility

- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] ARIA labels _(some present, not comprehensive)_
- [ ] Color contrast compliance
- [ ] Focus indicators

---

## 🧪 **12. Testing & Quality**

### 12.1 Testing (Future)

- [x] Unit tests _(basic component render tests)_
- [ ] Integration tests
- [ ] E2E tests
- [ ] Visual regression tests

### 12.2 Code Quality

- [x] ESLint configuration (already set up)
- [x] TypeScript strict mode
- [x] Code formatting (Prettier)

---

## 📝 **13. Documentation**

### 13.1 User Documentation

- [ ] Help center / FAQ page
- [ ] How-to guides
- [ ] Video tutorials (future)

### 13.2 Developer Documentation

- [ ] README updates _(minimal README still in place)_
- [ ] Code comments
- [ ] Architecture documentation

---

## 🎯 **Priority Order (Suggested Implementation)**

### Phase 1: Foundation (MVP Core)

1. ✅ Landing page with hero, features, footer
2. ✅ Mobile bottom navigation
3. ✅ Mobile sheet for transaction creation
4. ✅ Enhanced transaction form with categories
5. ✅ Improved transaction list with grouping
6. ✅ Basic analytics dashboard

### Phase 2: Enhancement

7. ✅ Category management _(custom categories: add + delete)_
8. ✅ Charts and visualizations
9. User profile & settings _(profile + stats + export + account deletion done; theme toggle / currency / date format pending)_
10. ✅ Dark mode
11. Search functionality _(transaction-level done; global search pending)_

### Phase 3: Polish

12. Animations and transitions _(partial)_
13. ✅ Onboarding flow
14. Export functionality _(not started)_
15. Advanced analytics

### Phase 4: Scale (Future)

16. Import functionality
17. Recurring transactions
18. Budget management
19. Multi-currency support
20. Team/sharing features

---

## 📋 **Technical Considerations**

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (already configured)
- **Icons**: lucide-react
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma
- **State Management**: React Server Components + Client Components
- **Forms**: React Server Actions
- **Notifications**: Sonner
- **Charts**: ✅ recharts installed and in use
- **Date Handling**: ✅ date-fns installed
- **Sheet Component**: ✅ vaul drawer + shadcn dialog

---

## ✅ **Checklist Summary**

- [x] Landing page (hero, features, footer)
- [x] Mobile bottom navigation
- [x] Mobile transaction sheet
- [x] Enhanced transaction form
- [x] Category management _(default + custom categories with add/delete)_
- [x] Improved transaction list
- [x] Analytics dashboard
- [x] Charts & visualizations
- [x] User profile & settings _(profile, stats, theme toggle, CSV export, account deletion)_
- [x] Dark mode
- [ ] Search functionality _(transaction-level done; global pending)_
- [x] Export functionality _(CSV)_
- [x] Onboarding flow _(welcome modal + first-transaction empty state)_
- [ ] Animations & polish _(partial)_
- [x] Responsive design (mobile-first)
- [ ] Accessibility improvements

---

**Note**: This is a living document. Features can be added, removed, or reprioritized as needed. Each feature should be implemented one at a time when instructed.
