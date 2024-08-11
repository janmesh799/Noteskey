"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

export default function withoutAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter()
    const auth = useAppSelector(
      (state: RootState) => state.auth.isAuthenticated
    );

    useEffect(() => {
      if (auth) {
        return router.replace("/dashboard");
      }
    }, [auth]);

    if (auth) {
      return null;
    }
    return <Component {...props} />;
  };
}
