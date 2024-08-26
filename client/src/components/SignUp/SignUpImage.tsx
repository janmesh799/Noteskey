"use client";
import React from "react";
import SignupPageImage from '../../assets/Signup/SignupPageImage.jpeg';
import Logo from "../../assets/logo.png";
import Image from "next/image";
import { ThemeColors } from "@/store/theme/Types";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import "./SignUpImage.css"; // Import the CSS file

const SignUpImage = () => {
  const { colors }: { colors: ThemeColors } = useAppSelector(
    (state: RootState) => state.theme
  );

  return (
    <div className="sign-up-image-container">
      {/* Logo */}
      <div className="logo-container">
        <Image 
          src={Logo}
          alt="logo image"
          className="logo"
          priority
        />
        <h5 className="logo-text">Planner Pulse</h5>
      </div>
      {/* Signup page image - mobile hidden */}
      <div className="signup-image-container">
        <Image
          src={SignupPageImage}
          alt="signup page image"
          className="signup-image"
          priority
        />
      </div>
    </div>
  );
};

export default SignUpImage;
