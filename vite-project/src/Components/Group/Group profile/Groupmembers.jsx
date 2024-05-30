import React, { useEffect, useState } from "react";
import "../../../App.css";
import Navbar from "../../Homepage/Navbar";
import Navbarheader from "../../Homepage/Navbarheader";
import { NavLink, useParams } from "react-router-dom";
import { MdBlock, MdOutlineFileUpload } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { FaRegClock, FaRegEye } from "react-icons/fa";
import axios from 'axios'
// import './Usercontrol.css'
export default function Groupmembers() {
  const [selectedTab, setSelectedTab] = useState("Members");

  const handleItemClick = (itemName) => {
    setSelectedTab(itemName);
  };
  const [groups, setGroups] = useState([]);
  const { id } = useParams();


  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `https://pj-3-ug2p.onrender.com/api/v1/group/${id}`
      );
      console.log(response.data.group)
      setGroups(response.data.group)
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);
  return (
    <div className="flex flex-grow text-color">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <Navbarheader />
        <div className="h-[var(--navbar-height)]"></div>
      </div>

      <div className=" flex-grow" style={{ background: "rgb(25, 26, 28)" }}>
      <div className="layout-container page has-gradient px-4" style={{ height: 'auto', position: 'relative'}}>
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
          <div className="relative" style={{ gridArea: "buttons" }}>
            <div className="flex flex-row-reverse flex-col gap-2">
              <button
                className="flex-grow rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden primary px-4 flex-grow"
                style={{ minHeight: "3rem", minWidth: "100%" }}
              >
                <span className="flex relative items-center justify-center font-medium select-none w-full" style={{fontSize: '20px'}}>
                  <CiBookmark className="icon mr-4" />
                  Follow
                </span>
              </button>
            </div>
          </div>
          <div className="min-w-0 ml-2" style={{ gridArea: "content" }}>
            <div className="font-bold text-4xl mt-1  flex items-center relative z-[3]">
              {/* Replace with group.groupName later */}
              <div className="break-all">{groups.groupName} </div>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="tt-container">
                <span className="trigger">
                  <span className="stats__container">
                    <MdOutlineFileUpload className="feather feather-upload icon small text-icon-contrast text-undefined" />
                    {groups && groups.uploadedItems && groups.uploadedItems.length > 0 ?  (
                      <span>{groups.uploadedItems.length}</span>
                    ) : (
                      <span>0</span>
                    )
                    }
                  </span>
                </span>
              </span>
            </div>
            <div className="overflow-x-auto fill-width tabs mb-6">
              <div className="select__tabs">
                <NavLink
                  to={`/group/profile/${groups._id}/`}
                  className={`select__tab ${
                    selectedTab === "Info" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Info")}
                >
                  Info
                </NavLink>
                <NavLink
                  to={`/group/${groups._id}/uploads`}
                  className={`select__tab ${
                    selectedTab === "Uploads" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Titles")}
                >
                  Titles
                </NavLink>
                <NavLink
                  to={`/group/${groups._id}/members`}
                  className={`select__tab ${
                    selectedTab === "Uploads" ? "active" : ""
                  }`}
                  onClick={() => handleItemClick("Members")}
                >
                  Members
                </NavLink>
              </div>
            </div>
            <div className="relative">

             {groups && groups.groupLeader && (

             <div className="mb-6">
              
              <div className="font-bold mb-2">Group Leader</div>
              <NavLink to={`/user/profile/${groups.groupLeader._id}`} className="user-card">
                <div className="user-head">
                  <img src="https://mangadex.org/img/avatar.png" alt="Avatar" className="user-avatar" style={{width: '32px', height: '32px'}}/>
                  <div className="line-clamp-1">{groups.groupLeader.userName}</div>
                </div>
              </NavLink>
             </div>
             )}
             {groups && groups.groupMembers && (

             <div className="mb-6">
              <div className="font-bold mb-2">
                Group Members
              </div>
             
              {groups.groupMembers.map((member, index) => (

              <div className="grid gap-2" key={index}>
                <NavLink to={`/user/profile/${member._id}`} className="user-card">
                  <div className="user-head">
                  <img src="https://mangadex.org/img/avatar.png" alt="Avatar" className="user-avatar" style={{width: '32px', height: '32px'}}/>
                  <div className="line-clamp-1 break-all">{member.userName}</div>
                  </div>
                </NavLink>
              </div>
               ))}
             </div>
             )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
