"use client";
import React from "react";
import signupPageImage from "@/assets/Signup/SignupPageImage.jpeg";
import Logo from "../../assets/logo.png";
import Image from "next/image";
import { ThemeColors } from "@/store/theme/Types";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import "./SignupImage.css"; // Import the CSS file

const SignupImage = () => {
  const { colors }: { colors: ThemeColors } = useAppSelector(
    (state: RootState) => state.theme
  );

  return (
    <div className="signup-image-container">
      {/* Logo */}
      <div className="signup-logo-container">
        <Image src={Logo} alt="logo image" className="signup-logo-image" priority />
        <h5 className="signup-logo-text">Planner Pulse</h5>
      </div>
      {/* signup page image - hidden on mobile */}
      <div className="signup-page-image-container">
        <Image
          src={signupPageImage}
          alt="signup page image"
          className="signup-page-image"
          priority
        />
      </div>
    </div>
  );
};

export default SignupImage;
