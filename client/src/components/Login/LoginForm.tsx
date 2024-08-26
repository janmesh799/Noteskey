"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { clearError, login } from "@/store/auth/authSlice";
import "./LoginForm.css"; // Import the CSS file

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, successMessage } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);
  const { colors } = useAppSelector((store: RootState) => store.theme);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setEmail(email.toLowerCase().trim());
    setPassword(password.trim());

    if (email === "" || password === "") {
      setLocalError("Please fill in both fields.");
      return;
    }
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    setLocalError("");
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  return (
    <div className="login-form-container">
      <div>
        <p className="register-link">
          Not a registered user?{" "}
          <Link href="/signup" className="link">
            Register Now
          </Link>
        </p>
        <div className="header">
          <h3>Hello Again!</h3>
          <h6>Welcome Back, you've been missed!</h6>
        </div>
        <form onSubmit={handleSubmit} className="form">
          {localError && (
            <p className="error-message">{localError}</p>
          )}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <div className="input-container">
            <label htmlFor="login-email" className="label">
              Email address
            </label>
            <input
              type="email"
              id="login-email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="login-password" className="label">
              Password
            </label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
              <div
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <VisibilityIcon className="icon" />
                ) : (
                  <VisibilityOffIcon className="icon" />
                )}
              </div>
            </div>
          </div>
          <div className="submit-button-container">
            <button
              disabled={isLoading}
              type="submit"
              className="submit-button"
            >
              {isLoading ? "Loading...." : "Sign In"}
            </button>
          </div>
          <div className="recovery-link">
            <Link href="/forgot-password" className="link">
              Recovery Password
            </Link>
          </div>
        </form>
      </div>
      <div className="alternate-login">
        <p className="alternate-login-text">Or continue with</p>
        <div className="google-login">
          <GoogleIcon className="google-icon" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
