import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import Navbar from "../Homepage/Navbar";
import "../styles/Navbar.css";
import { CiSearch, CiStar, CiBookmark, CiUser } from "react-icons/ci";
import {
  FaRegClock,
  FaRegCommentAlt,
  FaRegEye,
  FaRegUser,
} from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import bookData from "../../data";
import { GoBook, GoDotFill } from "react-icons/go";
import { FaRegFlag } from "react-icons/fa";
import { MdOutlineFileUpload, MdOutlineGroup } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";
import { formatDistanceToNow } from "date-fns";

import Navbarheader from "../Homepage/Navbarheader";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Chapters");

  const handleItemClick = (itemName) => {
    setSelectedTab(itemName);
  };

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const response = await axios.get(
          `https://pj-3-ug2p.onrender.com/api/v1/title/${id}`
        );
        console.log(response.data.data)
        setManga(response.data.data);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchMangaData();
  }, [id]);

  return (
    <div className="flex flex-grow text-color">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <Navbarheader />
        <div className="h-[var(--navbar-height)]"></div>
        <div className="flex-grow" style={{ background: "rgb(25,26,28)" }}>
          {manga && (
            <div className="layout-container manga has-gradient px-4">
              <div
                className="absolute top-0 left-0  w-full h-[640px] blur-xl filter-xl"
                style={{
                  background: `radial-gradient(circle at top, rgb(var(--md-background) / 0.8), rgb(var(--md-background)) 75%), no-repeat top 35% center / 100% url(${manga.images})`,
                }}
              ></div>

              <div className="banner-container block">
                <div
                  className="banner-image"
                  style={{
                    backgroundImage: `url(${manga.images})`,
                    width: "calc(100% - 256px)",
                  }}
                >
                  <div className="banner-shade"></div>
                </div>
              </div>
              <div style={{ gridArea: "art" }}>
                <div>
                  <NavLink
                    to={`/title/${manga._id}`}
                    className="group flex item-start relative mb-auto select-none"
                  >
                    <div className="flex opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center inset-0 absolute bg-black bg-opacity-50 pointer-events-none rounded"></div>
                    <img
                      src={manga.images}
                      alt="Cover image"
                      className="rounded shadow-md w-full h-auto"
                      style={{ height: "288px" }}
                    ></img>
                  </NavLink>
                </div>
              </div>
              <div className="title">
                <p
                  className="mb-1"
                  style={{
                    lineHeight: "1.1em",
                    overflowWrap: "break-word",
                    textShadow: "rgba(0,0,0,0.3) 1px 2px 4px",
                    fontSize: "4.5rem",
                    width: "1168px",
                  }}
                >
                  {manga.title}
                </p>
                {manga.altName ? (
                  <div className="font-normal line-clamp-2 text-xl inline-block">
                    {book.altName}
                  </div>
                ) : null}
                <div className="flex-grow block"></div>
                <div className="font-normal text-base truncate flex-shrink-0">
                  {manga.author.name}
                </div>
              </div>
              <div className="ml-2 relative" style={{ gridArea: "buttons" }}>
                <div className="flex gap-2 mb-0 flex-wrap">
                  <button
                    className="flex flex-grow-0 whitespace-nowrap px-3 rounded custom-opacity relative md-btn flex items-center overflow-hidden primary glow "
                    style={{ minHeight: "3rem", minWidth: "13.75rem" }}
                  >
                    <span className="flex relative items-center justify-center font-medium select-none w-full">
                      Add to Library
                    </span>
                  </button>
                  <button
                    className="flex flex-grow-0 whitespace-nowrap px-3 rounded custom-opacity relative md-btn flex items-center overflow-hidden accent "
                    style={{ minHeight: "3rem", minWidth: "13.75rem" }}
                  >
                    <span className="flex relative items-center justify-center font-medium select-none w-full">
                      <GoBook className="icon mr-4" />
                      Start Reading
                    </span>
                  </button>
                  <button
                    className="flex flex-grow-0 whitespace-nowrap px-3 rounded custom-opacity relative md-btn flex items-center overflow-hidden accent "
                    style={{ minHeight: "3rem" }}
                  >
                    <span className="flex relative items-center justify-center font-medium select-none w-full">
                      <FaRegFlag className="icon mr-4" />
                      Report
                    </span>
                  </button>
                  <NavLink
                    to={`/title/upload/${manga._id}`}
                    className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent"
                    style={{ minHeight: "3rem", minWidth: "0rem" }}
                  >
                    <span className="flex relative items-center justify-center font-medium select-none w-full">
                      <MdOutlineFileUpload className="icon mr-4" />
                      Upload Chapter
                    </span>
                  </NavLink>
                </div>
              </div>
              <div className="mx-2 z-[3]" style={{ gridArea: "info" }}>
                <div className="flex gap-1 flex-wrap items-center">
                  <div
                    className="flex flex-wrap gap-1 tags-row"
                    style={{ maxHeight: "calc(1em+0rem)" }}
                  >
                    {manga.genre.map((genre, i) => (
                      <NavLink key={i} to={"/"} className="tag bg-accent">
                        {genre}
                      </NavLink>
                    ))}
                  </div>
                  <span
                    className="tag dot no-wrapper font-bold uppercase"
                    style={{ fontSize: "0.75rem", color: "#fff" }}
                  >
                    <GoDotFill
                      className="icon"
                      style={{
                        color:
                          manga.status === "Ongoing"
                            ? "rgb(var(--md-status-green))"
                            : manga.status === "Completed"
                            ? "rgb(var(--md-status-blue))"
                            : "initial",
                      }}
                    />

                    <span>
                      Publication {manga.publicDate}, {manga.status}{" "}
                    </span>
                  </span>
                </div>
              </div>
              <div
                className="min-w-0 z-[3]"
                style={{ gridArea: "synopsis ", color: "#fff" }}
              >
                <div style={{ wordBreak: "break-word" }}>
                  <div
                    className="overflow-hidden transition-[max-height,height]"
                    style={{ maxHeight: "234px", height: "auto" }}
                  >
                    <div>
                      <div className="py-0 text-sm">
                        <div className="md-md-container">
                          <p>{manga.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-w-0 z-[3]" style={{ gridArea: "content" }}>
                <div className="overflow-x-auto fill-width mt-2 mb-4">
                  <div className="select__tabs">
                    <div className="track">
                      <div className="selector"></div>
                    </div>
                    <NavLink
                      to={"/"}
                      className={`select__tab ${
                        selectedTab === "Chapters" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("Chapters")}
                    >
                      <span>Chapters</span>
                    </NavLink>
                    <NavLink
                      to={"/"}
                      className={`select__tab ${
                        selectedTab === "Comments" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("Comments")}
                    >
                      <span>Comments</span>
                    </NavLink>
                    <NavLink
                      to={"/"}
                      className={`select__tab ${
                        selectedTab === "Related" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("Related")}
                    >
                      <span>Related</span>
                    </NavLink>
                  </div>
                </div>
                <div className="flex gap-6 item-start">
                  <div
                    className="flex flex-wrap gap-x-4 gap-y-2 "
                    style={{
                      flexBasis: "30%",
                      maxWidth: "400px",
                      minWidth: "25%",
                      marginTop: "4rem",
                    }}
                  >
                    <div className="mb-2">
                      <div className="font-bold mb-2">Author</div>
                      <div className="flex gap-2 flex-wrap">
                        <NavLink to={"/"} className="tag">
                          <span>{manga.author.name}</span>
                        </NavLink>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="font-bold mb-2">Artist</div>
                      <div className="flex gap-2 flex-wrap">
                        <NavLink to={"/"} className="tag">
                          <span>
                            {manga.artist
                              ? manga.artist.name
                              : manga.author.name}
                          </span>
                        </NavLink>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="font-bold mb-2">Genres</div>
                      <div className="flex gap-2 flex-wrap">
                        {manga.genre.map((genre, i) => (
                          <NavLink to={"/"} className="tag" key={i}>
                            <span>{genre}</span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="font-bold mb-2">Themes</div>
                      <div className="flex gap-2 flex-wrap">
                        {manga.theme.map((theme, i) => (
                          <NavLink to={"/"} className="tag" key={i}>
                            <span>{theme}</span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="font-bold mb-2">Format</div>
                      <div className="flex gap-2 flex-wrap">
                        {manga.format.map((format, i) => (
                          <NavLink to={"/"} className="tag" key={i}>
                            <span>{format}</span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex gap-x-2 mb-4">
                      <button
                        className="mr-auto rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text-sm mr-auto"
                        style={{ minHeight: "1.75rem", minWidth: "1.75rem" }}
                      >
                        <span className="flex relative items-center justify-center font-medium select-none w-full"></span>
                      </button>
                      <button
                        className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text-sm"
                        style={{ minHeight: "1.75rem", minWidth: "1.75rem" }}
                      >
                        <span className="flex relative items-center justify-center font-medium select-none w-full">
                          Collapse
                        </span>
                      </button>
                    </div>
                    <div>
                      <div className="flex flex-col">
                        <div className="grid grid-cols-12 volume-head mb-2">
                          <div className="col-span-4 font-15">
                            Chapters List
                          </div>
                        </div>
                        <div
                          className="rounded flex flex-col gap-2"
                          style={{ height: "auto" }}
                        >
                          {manga.chapters.length > 0 ? (
                            manga.chapters.map((chapter, index) => (
                              <div className="bg-accent rounded-sm" key={index}>
                                <div className="flex chapter relative read">
                                  <div className="chapter-grid flex-grow">
                                    <NavLink
                                      to={`/title/${manga._id}/chapter/${chapter._id}`}
                                      className="flex flex-grow items-center"
                                      style={{ gridArea: "title" }}
                                    >
                                      <span className="chapter-link">
                                       Chapter {chapter.chapterNumber} - {chapter.title}
                                      </span>
                                    </NavLink>
                                 
                                    <div
                                      className="flex items-center justify-self-start"
                                      style={{ gridArea: "groups" }}
                                    >
                                      <MdOutlineGroup className="icon small text-icon-contrast text-undefined rounded mr-1" />
                                      <div className="flex items-center space-x-1">
                                        <NavLink
                                          to={"/"}
                                          className="group-tag lift"
                                        >
                                          No Group
                                        </NavLink>
                                      </div>
                                    </div>
                            
                                    <div
                                      className="user-tag flex items-center justify-self-start"
                                      style={{ gridArea: "uploader" }}
                                    >
                                      <CiUser className="icon small mr-1" />
                                      <NavLink
                                        to={`/user/profile/${manga.uploader._id}`}
                                        className="line-clamp-1 break-all px-1 rounded duration-100 pill lift"
                                      >
                                        {manga.uploader.userName}
                                      </NavLink>
                                    </div>
                                    <div
                                      className="flex items-center timestamp justify-self-start"
                                      style={{ gridArea: "timestamp" }}
                                    >
                                      <FaRegClock className="icon small mr-1" />
                                      <span> {formatDistanceToNow(new Date(chapter.createdAt), { addSuffix: true })}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div
                            className="flex items-center rounded justify-center py-4 px-6  mt-2 mb-6 bg-accent relative z-[3]"
                            
                          >
                            <span
                              className="text-center break-word overflow-auto"
                              style={{ fontSize: "20px" }}
                            >
                              No chapters found.
                            </span>
                          </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center flex-wrap gap-2 mt-6">
                        {/* For more chapters later  */}
                        <button className="rounded custom-opacity relative md-btn flex items-center  overflow-hidden accent disbaled text rounded-full px-0"></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
