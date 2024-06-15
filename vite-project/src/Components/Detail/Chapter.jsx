import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import Navbarheader from "../Homepage/Navbarheader";
import Navbar from "../Homepage/Navbar";
import { NavLink, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function Chapter() {
  const [chapter, setChapter] = useState(null);
  const { mangaId, chapterId } = useParams();

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const response = await axios.get(
          `https://pj-3-ug2p.onrender.com/api/v1/chapter/title/${mangaId}/chapter/${chapterId}`
        );
        setChapter(response.data.chapter); 
        
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchChapterData();
  }, [mangaId, chapterId]);
  const lastChapter = chapter && chapter.manga && 
  chapter.manga.length > 0 && 
  chapter.manga[chapter.manga.length - 1]._id === chapterId
  return (
    <div className="flex flex-grow text-color">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <Navbarheader />
        <div className="bg-dark md-content flex-grow">
          <div className="md--reader-wrap">
            <div className="md--reader-chapter">
              {chapter !== null && chapter.manga &&  (
                <div className="reader--header hide ls md--reader-header bg-dark" style={{marginTop: '45px'}}>
                  <div className="flex-grow">
                    <div className="reader--header-title">{chapter.title}</div>
                    <NavLink
                      to={`/title/${chapter.manga._id}`}
                      className="reader--header-manga"
                    >
                      {chapter.manga.title}
                    </NavLink>
                  </div>
                  <div className="reader--header-meta ">
                    <div className="reader--meta chapter-number bg-accent font-15">
                      Chapter {chapter.chapterNumber}
                    </div>
                    <div className="reader--meta chapter-page bg-accent font-15">
                      Total {chapter.pages.length} pages
                    </div>
                  </div>
                  <div className="reader--header-groups">
                    <div className="flex items-center">
                      <FaUser className="icon text-icon-contrast text-undefined rounded mr-1" />
                      <div className="flex items-center space-x-1">
                        <NavLink
                          to={`/user/profile/${chapter.uploader._id}`}
                          className="group-tag"
                        >
                          {chapter.uploader.userName}
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="min-w-0 relative pages-wrap ls md--reader-pages" style={{ cursor: "pointer" }}>
                <div className="overflow-x-auto flex items-center h-full" style={{ background: "transparent" }}>
                  <div className="mx-auto h-full" style={{ transformOrigin: "left top", touchAction: "revert", transform: "translate(0px, 0px) scale(1)" }}>
                    {/* map chapter images */}
                    {chapter && chapter.pages &&
                      chapter.pages.map((page, i) => (
                        <div
                          key={i}
                          className="md--page ls limit-height mx-auto"
                          style={{
                            paddingTop: "calc(0px + var(--header-padding))",
                            marginTop: "calc(-0px - var(--header-padding))",
                            marginBottom: "4px",
                          }}
                        >
                          <img
                            src={page}
                            alt={`Page ${i + 1}`}
                            className="img ls limit-height"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {lastChapter ? (
                <div style={{ gridArea: "next", height:  '50px'}} >
                  <NavLink
                    to={`/title/${mangaId}/chapter/${chapterId}`}
                    className="!rounded-none rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden primary px-4 !rounded-none"
                    style={{height: '50px'}}
                 >
                    <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                      Next Chapter
                    </span>
                  </NavLink>
                </div>
              ) : (
                <div style={{ gridArea: "next", height:  '50px'}} >
                  <NavLink
                    to={`/title/${mangaId}`}
                    className="!rounded-none rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden primary px-4 !rounded-none"
                    style={{height: '50px'}}
                 >
                    <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                      No more chapters, go back to manga info ?
                    </span>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
