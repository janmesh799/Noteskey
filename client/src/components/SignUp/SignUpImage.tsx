"use client";
import React from "react";
import SignupPageImage from '../../assets/Signup/SignupPageImage.jpeg'
import Logo from "../../assets/logo.png"
import Image from "next/image";
import { ThemeColors } from "@/store/theme/Types";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";

const SignUpImage = () => {
  const { colors }: { colors: ThemeColors } = useAppSelector(
    (state: RootState) => state.theme
  );

  return (
    <div className="relative w-full md:w-1/2 h-full flex flex-col md:flex-col items-center">
      {/* Logo */}
      <div className="w-full flex flex-row items-center justify-center md:justify-start p-6">
        <Image 
       
          src={Logo}
          alt="logo image"
          className="w-10 h-auto"
          priority
        />
        <h5 className={`text-lg font-semibold text-green-600`}>Planner Pulse</h5>
      </div>
      {/* Signup page image - mobile hidden */}
      <div className="hidden md:flex md:w-3/4 lg:w-5/6 xl:w-7/8 p-6 justify-center items-center">
        <Image
          src={SignupPageImage}
          alt="signup page image"
          className="drop-shadow-4xl w-full h-auto"
          priority
        />
      </div>
    </div>
  );
};

export default SignUpImage;
