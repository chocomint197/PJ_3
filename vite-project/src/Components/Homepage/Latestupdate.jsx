import React, { useEffect, useState } from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import { GrFormNextLink } from "react-icons/gr";
import { GoComment } from "react-icons/go";
import { MdOutlineGroup } from "react-icons/md";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

export default function LatestUpdate() {
  const [latestUpdate, setLatestUpdate] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchNewPopular = async () => {
      try {
        const response = await axios.get(`https://pj-3-ug2p.onrender.com/api/v1/`);
        const sortedData = response.data.data.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });        
        const slicedData = sortedData.slice(0, 20);
        setLatestUpdate(slicedData);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchNewPopular();
  }, []);

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedLatestUpdate = chunkArray(latestUpdate, itemsPerPage);
  console.log(chunkedLatestUpdate)
  return (
    <div className="header">
      <div className="flex justify-between items-center text-2xl mb-4 mt-2">
        <NavLink to={"/"}>
          <h2 className="font-header font-semibold">Latest Updates</h2>
        </NavLink>
        <NavLink
          to={"/"}
          style={{ minHeight: "2.5rem", minWidth: "2.5rem" }}
          className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text rounded-full px-0"
        >
          <span className="flex relative items-center justify-center font-medium w-full ">
            <GrFormNextLink className="icon" />
          </span>
        </NavLink>
      </div>
      <div className="grid gap-x-6 grid-cols-4">
        {chunkedLatestUpdate &&
          chunkedLatestUpdate.map((chunk, index) => (
            <div key={index} className="bg-accent">
              <div className="grid gap-4 p-4">
                {chunk.map((manga, mangaIndex) => (
                  <div key={mangaIndex} className="flex gap-2">
                    <div
                      style={{
                        minWidth: "56px",
                        maxHeight: "56px",
                        height: "100%",
                      }}
                    >
                      <NavLink
                        to={`/title/${manga._id}`}
                        className="item-start select-none w-full h-full flex mb-auto relative"
                      >
                        <img
                          src={manga.images}
                          alt="manga img"
                          className="rounded shadow-md w-full h-full "
                          style={{ width: "50px", height: "70px" }}
                        ></img>
                      </NavLink>
                    </div>
                    <div className="flex-grow flex flex-col justify-evenly">
                      <NavLink to={`/title/${manga._id}`}>
                        <h6 className="font-bold text-base break-all line-clamp-1">
                          {manga.title}
                        </h6>
                      </NavLink>

                      <div className="flex items-center justify-between">
                        {manga.chapters.length > 0 ? (
                          <NavLink
                          to={`/title/${manga._id}/chapter/${manga.chapters[manga.chapters.length - 1]._id}`}
                          className="flex items-center gap-2 mr-2"
                        >
                          <span className="line-clamp-1">
                            Chapter {manga.chapters[manga.chapters.length -1].chapterNumber}
                          </span>
                        </NavLink>
                        ) : (
                             <NavLink
                             to={"/"}
                             className="flex items-center gap-2 mr-2"
                           >
                             <span className="line-clamp-1">
                               No chapter uploaded
                             </span>
                           </NavLink>
                        )}
                     
                        <div className="comment-container hover">
                          <GoComment className="icon small" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <MdOutlineGroup className="icon small text-icon rounded icon mr-1" />
                          <div className="flex items-center space-x-1">
                            <NavLink
                              to={`/user/profile/${manga.uploader.id}`}
                              className="group-tag"
                            >
                              {manga.uploader.userName}
                            </NavLink>
                          </div>
                        </div>

                        <span className="timestamp text-color">
                        {manga.chapters.length > 0
                              ? formatDistanceToNow(
                                  new Date(
                                    manga.chapters[manga.chapters.length - 1].createdAt
                                  ),
                                  { addSuffix: true }
                                )
                              : formatDistanceToNow(new Date(manga.createdAt), {
                                  addSuffix: true,
                                })} 
                        </span>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
