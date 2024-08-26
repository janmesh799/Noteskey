// pages/index.tsx
import Link from "next/link";

function LandingPage() {
  return (
    <div className="bg">
      <h1>Landing Page</h1>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
    </div>
  );
}

export default LandingPage;
