"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";

export default function withAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = useAppSelector(
      (state: RootState) => state.auth.isAuthenticated
    );

    useEffect(() => {
      if (!auth) {
        return redirect("/login");
      }
    }, [auth]);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
