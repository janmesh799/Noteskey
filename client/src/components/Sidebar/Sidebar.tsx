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
import "./Sidebar.css";  // Import the CSS file

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

  const iconClass = `iconClass ${colors.background} ${colors.text}`;
  const activeIconClass = `activeIconClass ${colors.background} ${colors.text}`;

  return (
    <div
    style={{backgroundColor:colors.primary}}
      className={`sidebar-container ${colors.text}`}
    >
      {/* for icon bar */}
      <div className="icon-bar">
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
      <div style={{backgroundColor:colors.background}} className={`tab-content `}>
        <div className="tab-header">
          <Image className="logo" src={Logo} alt="Logo Image" />
          <h5 className="tab-title">Planner Pulse</h5>
          <hr className={`divider ${colors.text}`} />
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
