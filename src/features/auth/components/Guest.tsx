import Link from "next/link";

const Guest = () => {
  return (
    <div className="guest">
      <h1>Welcome</h1>
      <p>Please sign in to manage your expenses</p>
      <Link href="/login">Sign in</Link>
    </div>
  );
};

export default Guest;
