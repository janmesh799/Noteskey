// components/Hero.tsx

import Link from "next/link";

// components/Hero.tsx
export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
        Organize Your Thoughts with PlannerPulse
      </h1>
      <p className="text-lg md:text-xl mb-8 text-gray-600">
        Create, share, and sort your notes effortlessly
      </p>
      <button className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700 transition duration-300 w-full sm:w-auto">
        <Link href="/signup">Get Started</Link>
      </button>
    </section>
  );
}
