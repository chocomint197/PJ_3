import React, { useEffect, useState } from "react";
import "../../App.css";
import Navbar from "../Homepage/Navbar";
import Navbarheader from "../Homepage/Navbarheader";
import { NavLink, useParams } from "react-router-dom";
import { FaEye, FaRegClock, FaRegEye, FaRegUser } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { MdGroup } from "react-icons/md";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import ReactPaginate from "react-paginate";

export default function Profileuploads() {
  const [selectedTab, setSelectedTab] = useState("Uploads");
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // State để lưu trang hiện tại
  const itemsPerPage = 10; // Số lượng item trên mỗi trang

  const { id } = useParams();
  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(
          `https://pj-3-ug2p.onrender.com/api/v1/users/profile/${id}`
        );
        console.log(response.data.data.uploadedItems)
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchUserData();
  }, [id]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = user && user.data ? user.data.uploadedItems.slice(indexOfFirstItem, indexOfLastItem) : [];
  console.log(currentItems)
  const pageCount = user && user.data ? Math.ceil(user.data.uploadedItems.length / itemsPerPage) : 0;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="flex flex-grow text-color">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <Navbarheader />
        <div className="h-[var(--navbar-height)]"></div>
      </div>

      <div className=" flex-grow" style={{ background: "rgb(25, 26, 28)" }}>
        <div
          className="layout-container page has-gradient px-4"
          style={{ height: "auto", position: "relative" }}
        >
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
              {user && user.data && (
                <div className="break-all">{user.data.userName} </div>
              )}
            </div>

            <div className="overflow-x-auto fill-width tabs mb-6">
              <div className="select__tabs">
                <NavLink
                  to={`/user/profile/${id}`}
                  className={`select__tab ${
                    selectedTab === "Info" ? "active" : ""
                  }`}
                  onClick={() => setSelectedTab("Info")}
                >
                  Info
                </NavLink>
                <NavLink
                  to={`/user/profile/${id}/uploads`}
                  className={`select__tab ${
                    selectedTab === "Uploads" ? "active" : ""
                  }`}
                  onClick={() => setSelectedTab("Uploads")}
                >
                  Uploads
                </NavLink>
              </div>
            </div>

            {user && user.data && (
              <div>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <div key={index} className="chapter-feed__container details expand mb-4 relative z-[3]">
                      <NavLink
                        to={`/title/${item._id}`}
                        className="chapter-feed__cover"
                      >
                        <div className="group flex items-start relative mb-auto select-none w-full h-full chapter-feed__cover-image">
                          <img
                            src={
                              item.itemType === "mangas"
                                ? item.item.images
                                : item.item.manga.images
                            }
                            className="rounded shadow-md w-full h-full"
                          />
                        </div>
                      </NavLink>
                      <NavLink
                        to={`/title/${
                          item.itemType === "mangas"
                            ? item.item._id
                            : item.item.manga._id
                        }`}
                        className="chapter-feed__title"
                      >
                        {item.itemType === "mangas"
                          ? item.item.title
                          : item.item.manga.title}
                      </NavLink>
                      <div className="chapter-feed__chapters">
                        <div className="chapter-feed__chapters-list">
                          <div>
                            {item.itemType === "chapters" ? (
                              <div>
                                <div className="flex chapter relative">
                                  <div
                                    className="chapter-grid flex-grow"
                                    style={{ fontSize: "17px" }}
                                  >
                                    <NavLink
                                      to={`/title/${item.item.manga._id}/chapter/${item.item._id}}`}
                                      className="flex flex-grow items-center"
                                      style={{ gridArea: "title" }}
                                    >
                                      <FaRegEye
                                        className="feather feather-eye icon small text-icon-contrast text-undefined flex-shrink-0 cursor-pointer readMarker"
                                        style={{ opacity: 1 }}
                                      />
                                      <span className="chapter-link">
                                        Chapter {item.item.chapterNumber} - {item.item.title}
                                      </span>
                                    </NavLink>
                                    <NavLink
                                      to={"/"}
                                      className="justify-self-start comment-container hover"
                                      style={{ gridArea: "comments" }}
                                    >
                                      <BiComment className="icon small text-icon-contrast text-undefined" />
                                      <span>0</span>
                                    </NavLink>
                                    <div
                                      className="flex items-center flex justify-self-start "
                                      style={{ gridArea: "groups" }}
                                    >
                                      <MdGroup className="icon small text-icon-contrast text-undefined rounded  mr-1" />
                                      <div className="flex items-center space-x-1">
                                        <NavLink to={"/"} className="group-tag">
                                          No Group
                                        </NavLink>
                                      </div>
                                    </div>
                                    <div
                                      className="view-count"
                                      style={{ gridArea: "views" }}
                                    >
                                      <FaEye className="feather feather-eye icon small text-icon-contrast text-undefined mr-1" />
                                      <span>N/A</span>
                                    </div>
                                    <div
                                      className="user-tag flex items-center justify-self-start"
                                      style={{ gridArea: "uploader" }}
                                    >
                                      <FaRegUser className="icon small text-icon-contrast text-undefined mr-1" />
                                      <NavLink
                                        to={"/"}
                                        className="router-link-active router-link-exact-active line-clamp-1 break-all px-1 rounded duration-100 pill lift"
                                        style={{ color: "rgb(52, 152, 219)" }}
                                      >
                                        {user.data.userName}
                                      </NavLink>
                                    </div>
                                    <div
                                      className="flex items-center timestamp justify-self-start"
                                      style={{ gridArea: "timestamp" }}
                                    >
                                      <FaRegClock className="feather feather-clock icon small text-icon-contrast text-undefined mr-2" />
                                      <time className="whitespace-nowrap">
                                        {formatDistanceToNow(new Date(item.item.createdAt))}
                                      </time>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              
                              <div>
                                 {/* {console.log(item.item._id)} */}
                                {/* {console.log(item._id)}  */}
                                <div className="flex chapter relative">
                                  <div
                                    className="chapter-grid flex-grow"
                                    style={{ fontSize: "17px" }}
                                  >
                                    <NavLink
                                      to={`/title/${item.item._id}`}
                                      className="flex flex-grow items-center"
                                      style={{ gridArea: "title" }}
                                      >
                                        <FaRegEye
                                          className="feather feather-eye icon small text-icon-contrast text-undefined flex-shrink-0 cursor-pointer readMarker"
                                          style={{ opacity: 1 }}
                                        />
                                        <span className="chapter-link">
                                          No chapter uploaded
                                        </span>
                                      </NavLink>
                                      <NavLink
                                        to={"/"}
                                        className="justify-self-start comment-container hover"
                                        style={{ gridArea: "comments" }}
                                      >
                                        <BiComment className="icon small text-icon-contrast text-undefined" />
                                        <span>0</span>
                                      </NavLink>
                                      <div
                                        className="flex items-center flex justify-self-start "
                                        style={{ gridArea: "groups" }}
                                      >
                                        <MdGroup className="icon small text-icon-contrast text-undefined rounded  mr-1" />
                                        <div className="flex items-center space-x-1">
                                          <NavLink to={"/"} className="group-tag">
                                            No Group
                                          </NavLink>
                                        </div>
                                      </div>
                                      <div
                                        className="view-count"
                                        style={{ gridArea: "views" }}
                                      >
                                        <FaEye className="feather feather-eye icon small text-icon-contrast text-undefined mr-1" />
                                        <span>N/A</span>
                                      </div>
                                      <div
                                        className="user-tag flex items-center justify-self-start"
                                        style={{ gridArea: "uploader" }}
                                      >
                                        <FaRegUser className="icon small text-icon-contrast text-undefined mr-1" />
                                        <NavLink
                                          to={`/user/profile/${user.data._id}`}
                                          className="router-link-active router-link-exact-active line-clamp-1 break-all px-1 rounded duration-100 pill lift"
                                          style={{ color: "rgb(52, 152, 219)" }}
                                        >
                                          {user.data.userName}
                                        </NavLink>
                                      </div>
                                      <div
                                        className="flex items-center timestamp justify-self-start"
                                        style={{ gridArea: "timestamp" }}
                                      >
                                        <FaRegClock className="feather feather-clock icon small text-icon-contrast text-undefined mr-2" />
                                        <time className="whitespace-nowrap">
                                          {formatDistanceToNow(new Date(item.item.createdAt))} ago
                                        </time>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center rounded justify-center py-4 px-6  mt-2 mb-6 bg-accent relative z-[3]">
                      <span
                        className="text-center break-word overflow-auto"
                        style={{ fontSize: "20px" }}
                      >
                        No data found.
                      </span>
                    </div>
                  )}
  
                  {pageCount > 1 && (
                    <div className="flex justify-center flex-wrap gap-2 mt-6 pagination">
                      <ReactPaginate 
                        previousLabel={"←"}
                        nextLabel={"→"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }