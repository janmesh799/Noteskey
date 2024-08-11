"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuth";

function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  console.log("dashboard reached");
  return (
    <div>
      <h1>Welcome to the Dashboard!, {user?.name}</h1>
    </div>
  );
}

export default withAuth(Dashboard);
