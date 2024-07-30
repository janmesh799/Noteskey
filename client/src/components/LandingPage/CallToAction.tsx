import Link from "next/link";

// components/CallToAction.tsx
export default function CallToAction() {
  return (
    <section className="bg-indigo-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to boost your productivity?
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Join PlannerPulse today and revolutionize your note-taking experience
        </p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-md text-lg hover:bg-gray-100 transition duration-300 w-full sm:w-auto">
          <Link href="/signup"> Sign Up Now</Link>
        </button>
      </div>
    </section>
  );
}
