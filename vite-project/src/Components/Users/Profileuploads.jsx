import React, { useState } from "react";
import "../../App.css";
import Navbar from "../Homepage/Navbar";
import Navbarheader from "../Homepage/Navbarheader";
import { NavLink } from "react-router-dom";
import { FaEye, FaRegClock, FaRegEye, FaRegUser } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { MdGroup } from "react-icons/md";
export default function Profileuploads() {
  const [selectedTab, setSelectedTab] = useState("Uploads");

  const handleItemClick = (itemName) => {
    setSelectedTab(itemName);
  };
  return (
    <div className="flex flex-grow text-color">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <Navbarheader />
        <div className="h-[var(--navbar-height)]"></div>
      </div>

      <div className=" flex-grow" style={{ background: "rgb(25, 26, 28)" }}>
        <div className="layout-container page has-gradient px-4">
          <div
            className="absolute top-0 left-0 w-full h-[640px] blur-xl filter-xl"
            style={{
              background: `radial-gradient(circle at top, rgb(var(--md-background) / 0.8), rgb(var(--md-background)) 75%), no-repeat top 35% center / 100% url(https://mangadex.org/img/group-banner.png)`,
            }}
          ></div>
          <div className="banner-container">
            <div
              className="banner-image"
              style={{
                backgroundImage:
                  "url(https://mangadex.org/img/group-banner.png)",
                width: "calc(100% - 256px)",
              }}
            ></div>
            <div className="banner-shade"></div>
          </div>
          <div className="clear-banner"></div>
          <div className="self-end" style={{ gridArea: "art", zIndex: 3 }}>
            <img
              src="https://mangadex.org/img/avatar.png"
              alt="Avatar"
              className="profile"
            />
          </div>
          <div className="relative" style={{ gridArea: "button" }}></div>
          <div className="min-w-0 ml-2" style={{ gridArea: "content" }}>
            <div className="font-bold text-4xl mt-2 mb-6 flex items-center relative z-[3]">
              {/* Replace with user.userName later */}
              <div className="break-all">User 1 </div>
            </div>
            <div className="overflow-x-auto fill-width tabs mb-6">
              <div className="select__tabs">
                <NavLink
                  to={"/user/profile"}
                  className={`select__tab ${
                    selectedTab === "Info" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Info")}
                >
                  Info
                </NavLink>
                <NavLink
                  to={"/user/profileuploads"}
                  className={`select__tab ${
                    selectedTab === "Uploads" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Uploads")}
                >
                  Uploads
                </NavLink>
              </div>
            </div>
            <div>
              <div
                className="flex items-center rounded justify-center py-4 px-6  mt-2 mb-6 bg-accent relative z-[3]"
                style={{ display: "none" }}
              >
                <span
                  className="text-center break-word overflow-auto"
                  style={{ fontSize: "20px" }}
                >
                  No data found.
                </span>
              </div>

              {/* if user.uploads > 1 */}
              {/* map upload */}
              <div className="chapter-feed__container details expand mb-4 relative z-[3]">
                {/* navlink to detail  */}
                <NavLink to={"/"} className="chapter-feed__cover">
                  <div className="group flex items-start relative mb-auto select-none w-full h-full chapter-feed__cover-image">
                    <img
                      src="https://mangadex.org/covers/ded54f3d-99bc-406a-bca1-4a1d4d618730/30796953-4130-46a4-bd14-6f9093672483.jpg.256.jpg"
                      className="rounded shadow-md w-full h-full"
                    />
                  </div>
                </NavLink>
                <NavLink to={"/"} className="chapter-feed__title">
                  Book 1
                </NavLink>
                <div className="chapter-feed__chapters">
                  <div className="chapter-feed__chapters-list">
                    <div>
                      {/* map chapter uploaded on that manga */}
                      <div className="flex chapter relative">
                        <div className="chapter-grid flex-grow" style={{fontSize: '17px'}}>
                          {/* navlink to specific chapter */}
                          <NavLink
                            to={"/"}
                            className="flex flex-grow items-center"
                            style={{ gridArea: "title" }}
                          >
                            <FaRegEye
                              className="feather feather-eye icon small text-icon-contrast text-undefined flex-shrink-0 cursor-pointer readMarker"
                              style={{ opacity: 1 }}
                            />

                            <span className="chapter-link">Chapter 1</span>
                          </NavLink>
                          {/* navlink to comment of that manga */}
                          <NavLink to={'/'} className="justify-self-start comment-container hover" style={{gridArea: 'comments'}}>
                          <BiComment className="icon small text-icon-contrast text-undefined"/>
                            <span>0</span>
                          </NavLink>
                          <div className="flex items-center flex justify-self-start " style={{gridArea: 'groups'}}>
                          <MdGroup className="icon small text-icon-contrast text-undefined rounded  mr-1" />
                            <div className="flex items-center space-x-1">
                                {/* navlink to group  */}
                                <NavLink to={'/'} className="group-tag">No Group</NavLink>
                            </div>
                          </div>
                          <div className="view-count" style={{gridArea: 'views'}}>
                          <FaEye className="feather feather-eye icon small text-icon-contrast text-undefined mr-1"/>
                            <span>N/A</span>
                          </div>
                          <div className="user-tag flex items-center justify-self-start" style={{gridArea: 'uploader'}}>
                          <FaRegUser className="icon small text-icon-contrast text-undefined mr-1" />
                            {/* navlink to user profile */}
                            <NavLink to={'/'} className="router-link-active router-link-exact-active line-clamp-1 break-all px-1 rounded duration-100 pill lift" style={{color: 'rgb(52, 152, 219)'}}>
                                User 1
                            </NavLink>
                          </div>
                          <div className="flex items-center timestamp justify-self-start" style={{gridArea: 'timestamp'}}>
                          <FaRegClock className="feather feather-clock icon small text-icon-contrast text-undefined mr-2" />
                            <time className="whitespace-nowrap">N/A</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
