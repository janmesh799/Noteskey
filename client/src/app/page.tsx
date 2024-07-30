// pages/index.tsx
import "../../styles/globals.css"
import CallToAction from '@/components/LandingPage/CallToAction'
import Features from '@/components/LandingPage/Features'
import Footer from '@/components/LandingPage/Footer'
import Header from '@/components/LandingPage/Header'
import Hero from '@/components/LandingPage/Hero'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Head>
        <title>PlannerPulse - Smart Note-Taking App</title>
        <meta name="description" content="Create, share, and organize your notes with ease using PlannerPulse" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}