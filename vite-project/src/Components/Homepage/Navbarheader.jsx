import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../App.css";
import { FaRegUser, FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbarheader() {
  const loginCheck = localStorage.getItem("token");
  const id = localStorage.getItem("userInfo");
  const [user, setUser] = useState(null);
  const [modalDisplay, setModalDisplay] = useState(false);
  const navigate = useNavigate()
  const modalRef = useRef(null);

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${loginCheck}`,
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(
          `https://pj-3-ug2p.onrender.com/api/v1/users/profile/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchUserData();
  }, [id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalDisplay(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    alert('Sign out success');
    window.location.reload()
    navigate('/')

  };

  return (
    <div className="navbar-wrap flex flex-col transparent header-hidden ma fixed top-0 right-0 max-w">
      <div className="navbar-main flex">
        <div className="nav-bar flex flex-grow justify-end w-full items-center gap-2">
          <div
            className="flex min-w fit mr-auto"
            style={{ display: "none" }}
          ></div>
          <div className="flex justify-end max-w-[50rem]">
            <div
              className="nav-bar-search flex flex-grow w-full"
              style={{ zIndex: 12 }}
            >
              <form action="/search" method="GET" className="md-inputwrap">
                <input
                  type="text"
                  className="header-search-input"
                  placeholder="Search"
                  title="Search"
                />
                <div className="md-border"></div>
                <div className="md-search-icon">
                  <CiSearch className="icon small" />
                </div>
                <div className="md-search-hint">
                  <span className="hint-icon">Ctrl</span>
                  <span className="hint-icon">K</span>
                </div>
              </form>
            </div>
            <div
              className="ml-2 ml-4 cursor-pointer bg-accent rounded-full flex items-center justify-center"
              style={{ minWidth: "40px", minHeight: "40px" }}
              onClick={() => setModalDisplay(!modalDisplay)}
            >
              {loginCheck ? (
                <img
                  src="https://mangadex.org/img/avatar.png"
                  className="icon icon-large"
                />
              ) : (
                <FaRegUser className="icon icon-large" />
              )}
            </div>
            <div
              ref={modalRef}
              className={`md-modal self-flex-start justify-end ${
                modalDisplay ? "block" : "none"
              }`}
            >
              <div className="md-modal_shade"></div>
              <div className="md-modal_box">
                <div className="profile-container">
                  {user && user.data ? (
                    <div>
                      <div>
                        <NavLink
                          to={`/user/profile/${id}`}
                          className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text px-4"
                          style={{ minHeight: "3rem", minWidth: "100%" }}
                        >
                          <span
                            className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none"
                            style={{ justifyContent: "center" }}
                          >
                            <div className="w-full my-2">
                              <div className="avatar mx-auto">
                                <img
                                  src="https://mangadex.org/img/avatar.png"
                                  alt="Avatar"
                                  className="rounded-full"
                                  style={{ width: "64px", height: "64px" }}
                                />
                              </div>
                              <div className="text-center font-bold text-xl line-clamp-1 mb-2 mt-4 break-all flex-shrink">
                                {user.data.userName}
                              </div>
                              <div className="flex justify-center">
                                <div
                                  className="role-tag inline-block"
                                  style={{
                                    backgroundColor: "rgb(250,250,250)",
                                    color: "rgb(0,0,0)",
                                  }}
                                >
                                  {user.data.role[0]}
                                </div>
                              </div>
                            </div>
                          </span>
                        </NavLink>

                        <hr className="my-4" />
                        <div>
                          <NavLink
                            to={`/user/profile/${id}`}
                            className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text"
                            style={{ minHeight: "2.5rem", minWidth: "2.5rem" }}
                          >
                            <span
                              className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none"
                              style={{ justifyContent: "start" }}
                            >
                              <div>
                                <FaUser className="icon text-icon-contrast text-undefined mr-2" />
                              </div>
                              <span>My Profile</span>
                            </span>
                          </NavLink>
                        </div>
                        <hr className="my-4" />
                        <button
                          className="list__item hover:bg-accent block cursor-pointer rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text px-4 list__item hover:bg-accent block cursor-pointer"
                          style={{ minHeight: "3rem", minWidth: "100%" }}
                          onClick={signOut}
                        >
                          <span
                            className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none"
                            style={{ justifyContent: "start" }}
                          >
                            <IoIosLogOut className="icon text-icon-contrast text-undefined mr-2" />
                            <span>Sign Out</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <NavLink
                          to={`/user/login`}
                          className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text px-4"
                          style={{ minHeight: "3rem", minWidth: "100%" }}
                        >
                          <span
                            className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none"
                            style={{ justifyContent: "center" }}
                          >
                            <div className="w-full my-2">
                              <div className="avatar mx-auto">
                                <FaUser className="icon xLarge text-icon-contrast text-undefined" />
                              </div>
                              <div className="text-center font-bold text-xl line-clamp-1 mb-2 mt-4 break-all flex-shrink">
                                Guest
                              </div>
                              <div className="flex justify-center">
                                <div
                                  className="role-tag inline-block"
                                  style={{
                                    backgroundColor: "rgb(250,250,250)",
                                    color: "rgb(0,0,0)",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </span>
                        </NavLink>

                        <hr className="my-4" />
                        <NavLink
                          to={"/user/login"}
                          className="mb-2 rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden primary glow px-4 mb-2"
                          style={{ minHeight: "2.5rem", minWidth: "100%" }}
                        >
                          <span
                            className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none"
                            style={{ justifyContent: "center" }}
                          >
                            Sign In
                          </span>
                        </NavLink>
                        <NavLink
                          to={"/user/register"}
                          className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text px-4"
                          style={{ minHeight: "3rem", minWidth: "100%" }}
                        >
                          <span
                            className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none"
                            
                          >
                            <span>Register</span>
                          </span>
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
