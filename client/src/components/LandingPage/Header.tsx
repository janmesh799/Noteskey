// components/Header.tsx
"use client"
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../assets/PlannerPulseLogo.png";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white  w-full transition-all duration-300 ease-in-out ">
      <nav className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300">
          <Image src={Logo} alt="product logo" height={200} width={200} className="" />
          
        </Link>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="sm:hidden bg-indigo-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <div className={`${isMenuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row items-center w-full sm:w-auto mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-4`}>
          <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 hover:underline">
            Features
          </Link>
          <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105 hover:shadow-md w-full sm:w-auto text-center">
            Sign Up
          </Link>
          <Link href="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-md border border-indigo-600 hover:bg-indigo-100 transition-colors duration-300 transform hover:scale-105 hover:shadow-md w-full sm:w-auto text-center">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}