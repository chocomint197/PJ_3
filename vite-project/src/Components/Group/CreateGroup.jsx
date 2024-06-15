import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import Navbarheader from "../Homepage/Navbarheader";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios'
export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleCreateGroup = async () => {
    try {
 
      const response = await axiosInstance.post(
        "https://pj-3-ug2p.onrender.com/api/v1/group/create",
        { groupName, groupDescription },
      );
      alert("Group created successfully:", response.data);
      console.log(response.data)
    } catch (error) {
      alert("Error creating group:", error);
    }
  };

  return (
    <div className="flex flex-grow text-color">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <Navbarheader />
        <div className="h-[var(--navbar-height)]"></div>
        <div
          className="md-content flex-grow"
          style={{ background: "rgb(25,26,28)" }}
        >
          <div className="page-container wide">
            <div className="flex items-center mb-6 mt-2">
              <h2 className="font-header text-2xl font-semibold">
                Create Group
              </h2>
            </div>
            <div>
              <div className="flex">
                <div className="button-menu">
                  <button
                    className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden primary"
                    style={{ minHeight: "1.625rem", minWidth: "3rem" }}
                  >
                    <span className="flex relative items-center justify-center font-medium select-none w-full text-color">
                      All
                    </span>
                  </button>
                </div>
                <div className="mr-4 mb-0"></div>
                <div className="mb-4 flex flex-col flex-auto" id="draft-form">
                  <div className="mb-2">
                    <div>
                      <div className="mb-6">
                        <div className="font-medium mb-2 font-1rem">
                          Group Name
                        </div>
                        <div className="md-input">
                          <div className="md-inputwrap">
                            <input
                              type="text"
                              className="placeholder-current p-2"
                              value={groupName}
                              onChange={(e) => setGroupName(e.target.value)}
                            />
                            <div className="mr-border"></div>
                            <label className="md-label"></label>
                          </div>
                        </div>
                        <div>
                          <div className="input-container mb-6">
                            <div className="label mt-5">
                              <div>Group Description</div>
                            </div>
                            <div>
                              <div className="gap-2">
                                <div>
                                  <div>
                                    <div className="text-item-container">
                                      <div className="relative flex-grow min-w-0">
                                        <input
                                          type="text"
                                          className="inline-input"
                                          value={groupDescription}
                                          onChange={(e) => setGroupDescription(e.target.value)}

                                        />
                                        <div className="absolute top-0 opacity-60 pointer-events-none pl-1 width-full line-clamp-1 break-all"></div>
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

                    <div className="actions-1 actions sticky">
                      <button
                        className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent"
                        style={{ minHeight: "3rem", minWidth: "13.75rem" }}
                      >
                        <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                          Cancel
                        </span>
                      </button>
                      <button
                        className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent primary"
                        style={{ minHeight: "3rem", minWidth: "13.75rem" }}
                        onClick={handleCreateGroup}

                   >
                        <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                          Save
                        </span>
                      </button>
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
