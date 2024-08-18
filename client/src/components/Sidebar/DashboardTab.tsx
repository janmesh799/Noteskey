import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import Link from "next/link";
import React from "react";

const DashboardTab = () => {
  const colors = useAppSelector((state: RootState) => state.theme.colors);
  const links: { title: string; url: string }[] = [
    { title: "+ Add note", url: "/notes/add-note" },
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <Link href="/dashboard">
        <h5 className="text-center">Dashboard</h5>
      </Link>
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            className={`text-center border p-2 shadow-lg rounded-md ${colors.border} `}
            href={link.url}
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardTab;
