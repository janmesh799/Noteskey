"use client";
import React from "react";
import LoginPageImage from "../../assets/Login/LoginPageImage.png";
import Logo from "../../assets/logo.png";
import Image from "next/image";
import { ThemeColors } from "@/store/theme/Types";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import "./LoginImage.css"; // Import the CSS file

const LoginImage = () => {
  const { colors }: { colors: ThemeColors } = useAppSelector(
    (state: RootState) => state.theme
  );

  return (
    <div className="login-image-container">
      {/* Logo */}
      <div className="logo-container">
        <Image src={Logo} alt="logo image" className="logo-image" priority />
        <h5 className="logo-text">Planner Pulse</h5>
      </div>
      {/* Login page image - hidden on mobile */}
      <div className="login-page-image-container">
        <Image
          src={LoginPageImage}
          alt="signup page image"
          className="login-page-image"
          priority
        />
      </div>
    </div>
  );
};

export default LoginImage;
