// pages/index.tsx
import Link from "next/link";

function Home() {
  return (
    <div className="bg">
      <h1>Landing Page</h1>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
    </div>
  );
}

export default Home;
