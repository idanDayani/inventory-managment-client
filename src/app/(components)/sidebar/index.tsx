"use client";

import { useAppSelector } from "@/app/redux";
import { setIsSideBarCollapsed } from "@/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Icon,
  Layout,
  LucideIcon,
  Menu,
  Settings,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

interface SidebarLinkProps {
  herf: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLinks = ({
  herf,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === herf || (pathname === "/" && herf === "/dashboard");

  return (
    <Link href={herf}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start py-4 px-8"
        } hover:text-blue-500 hover:bg-blue-100 hover:transition-colors duration-300 gap-3 ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSideBarCollapsed(!isSideBarCollapsed));
  };

  const sidebarClass = `fixed flex flex-col ${
    isSideBarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClass}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSideBarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>logo</div>
        <h1
          className={`${
            isSideBarCollapsed ? "hidden" : "block"
          }font-extrabold text-2xl`}
        >
          EDSTOCK
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-grow mt-8">
        <SidebarLinks
          herf="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLinks
          herf="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLinks
          herf="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLinks
          herf="/users"
          icon={User}
          label="Users"
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLinks
          herf="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLinks
          herf="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSideBarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div
        className={`${isSideBarCollapsed ? "hidden" : "block"} mb-10`}
      >
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Idan Dayani
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
