"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { clearError, signup } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import "./SignUpForm.css"

const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, isLoading, successMessage } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);
  const { colors } = useAppSelector((store: RootState) => store.theme);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setEmail(email.toLowerCase().trim());
    setPassword(password.trim());
    setConfirmPassword(confirmPassword.trim());

    if (email === "" || password === "" || confirmPassword === "") {
      setLocalError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    dispatch(signup({ name, email, password }));
  };

  useEffect(() => {
    setLocalError("");
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  useEffect(() => {
    setTimeout(() => {
      if (successMessage) {
        dispatch(clearError());
        router.push("/login");
      }
    }, 2000);
  }, [successMessage, dispatch,router]);

  return (
    <div className="signup-form-container">
      <div>
        <p className="login-link">
          Already a registered user?{" "}
          <Link href="/login" className="text-blue-500">
            Login Now
          </Link>
        </p>
        <div className="header">
          <h3 >Hello!</h3>
          <h6 >
            Sign Up Today and Never Miss a Note Again!
          </h6>
        </div>
        <form
          onSubmit={handleSubmit}
          className="form"
        >
          {localError && (
            <p className="error-message">
              {localError}
            </p>
          )}
          {successMessage && (
            <p className="success-message">
              {successMessage}
            </p>
          )}
          <div className="input-container">
            <label
              htmlFor="signup-name"
              className="label"
            >
              Name
            </label>
            <input
              type="text"
              id="signup-name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </div>
          <div className="input-container">
            <label
              htmlFor="signup-email"
              className="label"
            >
              Email address
            </label>
            <input
              type="email"
              id="signup-email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div className="input-container">
            <label
              htmlFor="signup-password"
              className="label"
            >
              Password
            </label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="signup-password"
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
          <div className="input-container">
            <label
              htmlFor="signup-confirm-password"
              className="label"
            >
              Confirm Password
            </label>
            <div className="password-container">
              <input
                type={showCPassword ? "text" : "password"}
                id="signup-confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
              />
              <div
                className="toggle-password"
                onClick={() => setShowCPassword(!showCPassword)}
              >
                {showCPassword ? (
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
              {isLoading ? "Loading...." : "Sign Up"}
            </button>
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

export default SignUpForm;
