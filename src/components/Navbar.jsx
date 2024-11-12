import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { Navbar, Button } from "flowbite-react";
import ReactFlagsSelect from "react-flags-select";
import { RiMenuFold2Fill } from "react-icons/ri";
import SidebarComponent from "./Sidebar";
import countries from "../utils/countries";
import { useAuthContext } from "../context/AuthContext";
import { TbLogout } from "react-icons/tb";

function NavbarComponent({
  changeCategory,
  setCountry,
  country,
  handleSearch,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { logout, userData } = useAuthContext();
  const handleLogout = () => {
    logout();
  };
  const location = useLocation();
  return (
    <>
      <SidebarComponent
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        toggleSidebar={toggleSidebar}
        country={country}
        handleSearch={handleSearch}
        changeCategory={changeCategory}
        setCountry={setCountry}
      />
      <div className="fixed w-full bg-white z-50">
        <div className="border py-4">
          <Navbar
            fluid
            className="mx-auto lg:max-w-screen-xl items-center justify-between text-xl"
          >
            <Button
              className="md:hidden"
              color=""
              onClick={() => toggleSidebar()}
            >
              <RiMenuFold2Fill className="text-2xl" />
            </Button>
            <Navbar.Brand>
              <NavLink to="/">
                <span className="font-bold border-2 py-2 border-black">
                  <span className="p-2">Insight</span>
                  <span className="bg-black text-white p-2">Daily</span>
                </span>
              </NavLink>
            </Navbar.Brand>
            <Navbar.Collapse>
              <Navbar.Link>
                <NavLink to="/bookmarks">
                  <span className="text-lg">Bookmarks</span>
                </NavLink>
              </Navbar.Link>
              <span className="text-lg">{userData.displayName}</span>
              <Navbar.Link>
                <NavLink onClick={() => handleLogout()}>
                  <div className="flex align-center justify-center">
                    <h1 className="text-lg pr-2">Logout </h1>
                    <div className="my-auto">
                      <TbLogout className="h-7 w-7" />
                    </div>
                  </div>
                </NavLink>
              </Navbar.Link>
            </Navbar.Collapse>
          </Navbar>
        </div>
        {location.pathname === "/" && (
          <div className="border hidden md:block">
            <Navbar fluid className="mx-auto max-w-screen-xl ">
              <div className="flex flex-wrap justify-center xl:justify-between items-center w-full">
                <div className="h-12 flex justifiy-center items-center">
                  <Navbar.Collapse>
                    <Navbar.Link>
                      <NavLink
                        className="text-base xl:text-lg"
                        onClick={() => {
                          changeCategory("global");
                          handleSearch("");
                        }}
                      >
                        Global
                      </NavLink>
                    </Navbar.Link>
                    <Navbar.Link>
                      <NavLink
                        className="text-base xl:text-lg"
                        onClick={() => {
                          changeCategory("general");
                          handleSearch("");
                        }}
                      >
                        General
                      </NavLink>
                    </Navbar.Link>
                    <Navbar.Link>
                      <NavLink
                        className="text-base xl:text-lg"
                        onClick={() => {
                          changeCategory("business");
                          handleSearch("");
                        }}
                      >
                        Business
                      </NavLink>
                    </Navbar.Link>
                    <Navbar.Link>
                      <NavLink
                        className="text-base xl:text-lg"
                        onClick={() => {
                          changeCategory("entertainment");
                          handleSearch("");
                        }}
                      >
                        Entertainment
                      </NavLink>
                    </Navbar.Link>

                    <Navbar.Link>
                      <NavLink
                        className="text-base xl:text-lg"
                        onClick={() => {
                          changeCategory("health");
                          handleSearch("");
                        }}
                      >
                        Health
                      </NavLink>
                    </Navbar.Link>
                    <Navbar.Link>
                      <NavLink
                        className="text-base xl:text-lg"
                        onClick={() => {
                          changeCategory("science");
                          handleSearch("");
                        }}
                      >
                        Science
                      </NavLink>
                    </Navbar.Link>
                    <Navbar.Link>
                      <NavLink
                        className="text-base xl:text-lg"
                        onClick={() => {
                          changeCategory("sports");
                          handleSearch("");
                        }}
                      >
                        Sports
                      </NavLink>
                    </Navbar.Link>
                    <Navbar.Link>
                      <NavLink
                        className="text-base xl:text-lg"
                        onClick={() => {
                          changeCategory("technology");
                          handleSearch("");
                        }}
                      >
                        Technology
                      </NavLink>
                    </Navbar.Link>
                  </Navbar.Collapse>
                </div>
                <div className="w-80 lg:pl-4">
                  <ReactFlagsSelect
                    searchable
                    selected={country}
                    onSelect={(code) => setCountry(code)}
                    countries={countries}
                  />
                </div>
              </div>
            </Navbar>
          </div>
        )}
      </div>
    </>
  );
}

export default NavbarComponent;
