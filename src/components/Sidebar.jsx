import React, { useState } from "react";
import { Button, Sidebar } from "flowbite-react";
import countries from "../utils/countries";
import { useLocation } from "react-router-dom";

import { HiArrowSmRight, HiTable } from "react-icons/hi";
import {
  MdBusinessCenter,
  MdOutlineSportsFootball,
  MdHealthAndSafety,
} from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { RiGlobalLine } from "react-icons/ri";
import { GiMaterialsScience } from "react-icons/gi";
import { FaGear, FaList } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";

import ReactFlagsSelect from "react-flags-select";
import { useAuthContext } from "../context/AuthContext";

function SidebarComponent({
  toggleSidebar,
  isSidebarOpen,
  country,
  changeCategory,
  setCountry,
  handleSearch,
}) {
  const { logout, userData } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  const location = useLocation();
  return (
    <Sidebar
      id="drawer-navigation"
      className={`md:hidden bg-white fixed top-0 left-0 z-40 w-80 h-screen overflow-y-auto transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Button
            color="black"
            onClick={() => toggleSidebar()}
            className="pt-4"
          >
            <svg
              aria-hidden="true"
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Button>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <ReactFlagsSelect
              searchable
              selected={country}
              onSelect={(code) => setCountry(code)}
              countries={countries}
            />
            <Sidebar.Item icon={FaUserAlt} className="text-xl">
              <span className="text-lg">{userData.displayName}</span>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          {location.pathname === "/" && (
            <>
              <Sidebar.Item
                href="#"
                icon={RiGlobalLine}
                className="text-xl"
                onClick={() => {
                  changeCategory("global");
                  handleSearch("");
                }}
              >
                Global
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={FaList}
                className="text-xl"
                onClick={() => {
                  changeCategory("general");
                  handleSearch("");
                }}
              >
                General
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={MdBusinessCenter}
                className="text-xl"
                onClick={() => {
                  changeCategory("business");
                  handleSearch("");
                }}
              >
                Business
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={PiTelevisionBold}
                className="text-xl"
                onClick={() => {
                  changeCategory("entertainment");
                  handleSearch("");
                }}
              >
                Entertainment
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={MdHealthAndSafety}
                className="text-xl"
                onClick={() => {
                  changeCategory("health");
                  handleSearch("");
                }}
              >
                Health
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={GiMaterialsScience}
                className="text-xl"
                onClick={() => {
                  changeCategory("science");
                  handleSearch("");
                }}
              >
                Science
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={MdOutlineSportsFootball}
                className="text-xl"
                onClick={() => {
                  changeCategory("sports");
                  handleSearch("");
                }}
              >
                Sports
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={FaGear}
                className="text-xl"
                onClick={() => {
                  changeCategory("technology");
                  handleSearch("");
                }}
              >
                Technology
              </Sidebar.Item>
            </>
          )}
          <Sidebar.Item
            href="#"
            onClick={() => handleLogout()}
            icon={TbLogout2}
            className="text-xl"
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarComponent;
