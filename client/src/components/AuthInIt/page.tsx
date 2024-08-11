"use client";

import { useAppDispatch } from "@/hooks/redux";
import { validateUser } from "@/store/auth/authSlice";
import React, { useEffect } from "react";

const AuthInIt = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('dispatching validate user')
    dispatch(validateUser());
  }, []);
  return <></>;
};

export default AuthInIt;
