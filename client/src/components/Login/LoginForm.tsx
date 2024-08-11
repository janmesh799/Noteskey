"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { clearError, login } from "@/store/auth/authSlice";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading,successMessage } = useAppSelector(
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
    <div className="w-full md:w-1/2 p-3 md:p-5 flex flex-col justify-between">
      <div>
        <p className="text-right mb-6 text-xs text-gray-600">
          Not a registered user?{" "}
          <Link href="/signup" className="text-blue-500">
            Register Now
          </Link>
        </p>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold">Hello Again!</h3>
          <h6 className="text-gray-500 text-sm mt-1">
            Welcome Back, you've been missed!
          </h6>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center space-y-2"
        >
          {localError && (
            <p className="w-4/6 text-red-500 text-center text-sm">
              {localError}
            </p>
          )}
          {successMessage && (
            <p className="w-4/6 text-green-500 text-center text-sm">
              {successMessage}
            </p>
          )}
          <div className="w-4/6">
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="login-email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:${colors.border} sm:text-sm`}
            />
          </div>
          <div className="w-4/6">
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:${colors.border} sm:text-sm`}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <VisibilityIcon className="text-zinc-500" />
                ) : (
                  <VisibilityOffIcon className="text-zinc-500" />
                )}
              </div>
            </div>
          </div>
          <div className="w-4/6 !mt-5">
            <button
              disabled={isLoading}
              type="submit"
              className={`px-2 py-1 flex justify-center items-center w-full text-white ${colors.primary} rounded-md hover:${colors.secondary} focus:outline-none focus:ring-2 focus:${colors.border} focus:ring-offset-2 h-[50px]`}
            >
              {isLoading ? "Loading...." : "Sign In"}
            </button>
          </div>
          <div className="!m-0 font-medium text-slate-500 w-4/6 text-right">
            <Link href="/forgot-password" className="w-full text-sm">
              Recovery Password
            </Link>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <p className="text-center text-gray-500 mb-4">Or continue with</p>
        <div className="flex justify-center">
          <GoogleIcon className="cursor-pointer text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
