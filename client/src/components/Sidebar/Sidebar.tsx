"use client";

import React, { useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaHashtag, FaRegNoteSticky } from "react-icons/fa6";
import { RiSettingsLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import DashboardTab from "./DashboardTab";
import TagTab from "./TagTab";
import NoteTab from "./NoteTab";
import SettingTab from "./SettingTab";
import HelpAndSupportTab from "./HelpAndSupportTab";
import { logout } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import Logo from "../../assets/logo.png";
import "../../app/globals.css";
import Image from "next/image";
import { redirect } from "next/navigation";

enum Tabs {
  DASHBOARD = "dashboard",
  TAG = "tag",
  NOTES = "notes",
  SETTINGS = "settings",
  SUPPORT = "support",
}

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { colors } = useAppSelector((state: RootState) => state.theme);
  const [currTab, setCurrTab] = useState<string>(Tabs.DASHBOARD);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const iconClass = `text-3xl text-white cursor-pointer hover:${colors.background} hover:${colors.text} hover:scale-110 hover:p-1 hover:shadow-xl hover:rounded-lg transition-all duration-200`;
  const activeIconClass = `text-3xl cursor-pointer ${colors.background} ${colors.text} scale-110 p-1 shadow-xl rounded-lg transition-all duration-200`;

  return (
    <div
      className={`${colors.primary} h-full w-full ${colors.text} flex justify-center items-center m-0 p-0`}
    >
      {/* for icon bar */}
      <div className="flex w-1/4 h-full flex-col justify-center items-center gap-12">
        <MdOutlineSpaceDashboard
          title="Dashboard"
          onClick={() => {
            setCurrTab(Tabs.DASHBOARD);
            redirect("/dashboard");
          }}
          className={currTab === Tabs.DASHBOARD ? activeIconClass : iconClass}
        />
        <FaHashtag
          title="Tag"
          onClick={() => setCurrTab(Tabs.TAG)}
          className={currTab === Tabs.TAG ? activeIconClass : iconClass}
        />
        <FaRegNoteSticky
          title="Notes"
          onClick={() => setCurrTab(Tabs.NOTES)}
          className={currTab === Tabs.NOTES ? activeIconClass : iconClass}
        />
        <RiSettingsLine
          title="Settings"
          onClick={() => setCurrTab(Tabs.SETTINGS)}
          className={currTab === Tabs.SETTINGS ? activeIconClass : iconClass}
        />
        <BiSupport
          title="Support"
          onClick={() => setCurrTab(Tabs.SUPPORT)}
          className={currTab === Tabs.SUPPORT ? activeIconClass : iconClass}
        />
        <CgLogOut
          title="Logout"
          onClick={logoutHandler}
          className={iconClass}
        />
      </div>

      {/* for tabs */}
      <div className={`w-3/4 h-full ${colors.background} rounded-3xl`}>
        <div className="flex flex-col justify-center items-center py-2">
          <Image className="w-1/2" src={Logo} alt="Logo Image" />
          <h5 className="w-full font-semibold text-center">Planner Pulse</h5>
          <hr className={`w-full border-t ${colors.text} mt-2`} />
        </div>
        {currTab === Tabs.DASHBOARD && <DashboardTab />}
        {currTab === Tabs.TAG && <TagTab />}
        {currTab === Tabs.NOTES && <NoteTab />}
        {currTab === Tabs.SETTINGS && <SettingTab />}
        {currTab === Tabs.SUPPORT && <HelpAndSupportTab />}
      </div>
    </div>
  );
};

export default Sidebar;
