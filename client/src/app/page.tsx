"use client";
import LandingPage from "@/components/LandingPage/LandingPage";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { redirect } from "next/navigation";

function Home() {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  if (isAuthenticated) {
    redirect('/dashboard')
  }
  return <LandingPage />;   
}

export default Home;
