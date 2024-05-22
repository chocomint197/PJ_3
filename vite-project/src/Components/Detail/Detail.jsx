import React, {useEffect, useRef, useState} from "react";
import "../../App.css";
import Navbar from "../Homepage/Navbar";
import "../styles/Navbar.css";
import { CiSearch, CiStar,  CiBookmark, CiUser  } from "react-icons/ci";
import { FaRegClock, FaRegCommentAlt, FaRegEye, FaRegUser } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import bookData from "../../data";
import { GoBook, GoDotFill  } from "react-icons/go";
import { FaRegFlag } from "react-icons/fa";
import { MdOutlineFileUpload, MdOutlineGroup } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";
import Navbarheader from "../Homepage/Navbarheader";


export default function Detail() {
  const { id } = useParams();
  const book = bookData.find((book) => book.id === parseInt(id, 10));
  const [selectedTab, setSelectedTab] = useState('Chapters');

  const handleItemClick = (itemName) => {
    setSelectedTab(itemName);
  
};
const [isDescending, setIsDescending] = useState(true);
const [chapters, setChapters] = useState(book.chapter);

const toggleOrder = () => {
  const newOrder = !isDescending;
  setIsDescending(newOrder);
  console.log(newOrder)
  setChapters([...chapters].sort((a, b) => {
    const numA = parseInt(a.replace('Chapter ', ''));
    const numB = parseInt(b.replace('Chapter ', ''));
    return newOrder ? numA - numB : numB - numA;
  }));
};



 
  return (
    <div className="flex flex-grow text-color">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <Navbarheader/>
        <div className="h-[var(--navbar-height)]"></div>
        <div className="flex-grow" style={{background :'rgb(25,26,28)'}}>
          <div className="layout-container manga has-gradient px-4">
            <div
              className="absolute top-0 left-0  w-full h-[640px] blur-xl filter-xl"
              style={{ 
                background: `radial-gradient(circle at top, rgb(var(--md-background) / 0.8), rgb(var(--md-background)) 75%), no-repeat top 35% center / 100% url(${book.img})`
            }}
            >
                </div>
                <div className="banner-container block">
                    <div className="banner-image" style={{backgroundImage: `url(${book.img})`, width: 'calc(100% - 256px)'}}>
                    <div className="banner-shade"></div>
                    </div>  
                </div>
                <div style={{gridArea: "art"}}>
                    <div>
                        <NavLink to={`/title/${book.id}`} className="group flex item-start relative mb-auto select-none">
                            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center inset-0 absolute bg-black bg-opacity-50 pointer-events-none rounded">
                                
                            </div>
                            <img src={book.img} alt="Cover image" className="rounded shadow-md w-full h-auto" style={{height: '288px'}}></img>
                        </NavLink>
                    </div>
                </div>
                <div className="title">
                    <p className="mb-1" style={{lineHeight: "1.1em", overflowWrap: 'break-word', textShadow: "rgba(0,0,0,0.3) 1px 2px 4px",fontSize: "4.5rem", width: '1168px'}}>
                    {book.name}
                    </p>
                    {book.altName ? ( <div className="font-normal line-clamp-2 text-xl inline-block">{book.altName}</div> )
                    : null    
                }
                    <div className="flex-grow block">
                    </div>
                    <div className="font-normal text-base truncate flex-shrink-0">
                        {book.author}
                    </div>
                </div>
                <div className="ml-2 relative" style={{gridArea:"buttons"}}>
                    <div className="flex gap-2 mb-0 flex-wrap">
                        <button className="flex flex-grow-0 whitespace-nowrap px-3 rounded custom-opacity relative md-btn flex items-center overflow-hidden primary glow " style={{minHeight: "3rem", minWidth: "13.75rem"}}>
                            <span className="flex relative items-center justify-center font-medium select-none w-full">
                                Add to Library
                            </span>
                        </button>
                        <button className="flex flex-grow-0 whitespace-nowrap px-3 rounded custom-opacity relative md-btn flex items-center overflow-hidden accent " style={{minHeight: "3rem", minWidth: "13.75rem"}}>
                            <span className="flex relative items-center justify-center font-medium select-none w-full">
                            <GoBook className="icon mr-4"/>
                            Start Reading
                            </span>
                        </button>
                        <button className="flex flex-grow-0 whitespace-nowrap px-3 rounded custom-opacity relative md-btn flex items-center overflow-hidden accent " style={{minHeight: "3rem"}}>
                            <span className="flex relative items-center justify-center font-medium select-none w-full">
                            <FaRegFlag className="icon mr-4"/>
                            Report
                            </span>
                        </button>
                        <NavLink  to={'/'} className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent" style={{minHeight: '3rem', minWidth:'0rem'}}>
                            <span className="flex relative items-center justify-center font-medium select-none w-full">
                            <MdOutlineFileUpload className="icon mr-4"/>
                            Upload Chapter
                            </span>
                        </NavLink>
                    </div>
                </div>
                <div className="mx-2 mt-auto mt-0 " style={{gridArea: "stats"}}>
                    <div className="flex gap-2 flex-wrap items-center text-base">
                        <span className="flex items-center relative group" style={{cursor: 'pointer'}}>
                        <CiStar className="icon rel text-primary mr-1"/>
                        <span className="text-primary">0</span>
                        </span>
                        <span className="flex items-center z-[3]" style={{cursor: 'pointer', color: '#fff'}}>
                        <CiBookmark className="icon rel mr-1"/>
                        0
                        </span>
                        <NavLink to={'/'} target="_blank" className="comment-container z-[3]">
                        <BiComment className="icon small text-icon-contrast text-undefined"/>
                        <span>0</span>
                        </NavLink>
                    </div>
                </div>
                <div className="mx-2 z-[3]" style={{gridArea: 'info'}}>
                    <div className="flex gap-1 flex-wrap items-center">
                        <div className="flex flex-wrap gap-1 tags-row" style={{maxHeight: 'calc(1em+0rem)'}}>
                        {book.categories.map((category, i) => (
                            <NavLink key={i} to={'/'} className="tag bg-accent">{category}</NavLink>
                        ))}
                        </div>
                        <span className="tag dot no-wrapper font-bold uppercase"style={{fontSize: '0.75rem',color: '#fff'}} >
                        <GoDotFill   className="icon"
                    style={{
                  color:
                    book.status === "ongoing"
                      ? "rgb(var(--md-status-green))"
                      : book.status === "completed"
                      ? "rgb(var(--md-status-blue))"
                      : "initial"
                }}/>

                        <span>Publication {book.publication}, {book.status} </span>
                        </span>
                    </div>
                </div>
                <div className="min-w-0 z-[3]" style={{gridArea: 'synopsis ', color: '#fff'}}>
                    <div style={{wordBreak: 'break-word'}}>
                        <div className="overflow-hidden transition-[max-height,height]" style={{maxHeight: '234px', height: 'auto'}}>
                            <div>
                                <div className="py-0 text-sm">
                                    <div className="md-md-container">
                                        <p>{book.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="min-w-0 z-[3]" style={{gridArea: 'content'}}>
                    <div className="overflow-x-auto fill-width mt-2 mb-4">
                      <div className="select__tabs">
                        <div className="track">
                          <div className="selector"></div>
                        </div>
                        <NavLink to={'/'} className={`select__tab ${selectedTab === 'Chapters' ? 'active' : ''}`} onClick={() => handleItemClick('Chapters')} >
                          <span>Chapters</span>
                        </NavLink>
                        <NavLink to={'/'} className={`select__tab ${selectedTab === 'Comments' ? 'active' : ''}`} onClick={() => handleItemClick('Comments')} >
                          <span>Comments</span>
                        </NavLink>
                        <NavLink to={'/'} className={`select__tab ${selectedTab === 'Related' ? 'active' : ''}`} onClick={() => handleItemClick('Related')} >
                          <span>Related</span>
                        </NavLink>

                      </div>
                    </div>
                    <div className="flex gap-6 item-start">
                      <div className="flex flex-wrap gap-x-4 gap-y-2 " style={{flexBasis: '30%', maxWidth: '400px', minWidth: '25%',marginTop: '4rem'}}>
                        <div className="mb-2">
                          <div className="font-bold mb-2">Author</div>
                          <div className="flex gap-2 flex-wrap">
                              <NavLink to={'/'} className="tag"><span>{book.author}</span></NavLink>
                          </div>
                          
                        </div>
                        <div className="mb-2">
                            <div className="font-bold mb-2">Artist</div>
                            <div className="flex gap-2 flex-wrap">
                              <NavLink to={'/'} className="tag"><span>{book.author}</span></NavLink>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="font-bold mb-2">Genres</div>
                            <div className="flex gap-2 flex-wrap">
                            {book.categories.map((category, i) => (
                              <NavLink to={'/'} className="tag" key={i}>
                                <span>{category}</span>
                              </NavLink>
                              ))}
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="font-bold mb-2">Themes</div>
                            <div className="flex gap-2 flex-wrap">
                            {book.themes.map((theme, i) => (
                              <NavLink to={'/'} className="tag" key={i}>
                                <span>{theme}</span>
                              </NavLink>
                              ))}
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="font-bold mb-2">Format</div>
                            <div className="flex gap-2 flex-wrap">
                            {book.formats.map((format, i) => (
                              <NavLink to={'/'} className="tag" key={i}>
                                <span>{format}</span>
                              </NavLink>
                              ))}
                            </div>
                          </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex gap-x-2 mb-4">
                          <button className="mr-auto rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text-sm mr-auto" style={{minHeight: '1.75rem', minWidth: '1.75rem'}}
                                  onClick={toggleOrder}

                          >
                            <span className="flex relative items-center justify-center font-medium select-none w-full">
                            {isDescending ? 'Descending' : 'Ascending'}
                            </span>
                          </button>
                          <button className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text-sm" style={{minHeight: '1.75rem', minWidth: '1.75rem'}}>
                            <span className="flex relative items-center justify-center font-medium select-none w-full">
                              Collapse
                            </span>

                          </button>
                        </div>
                        <div>
                          <div className="flex flex-col">
                            <div className="grid grid-cols-12 volume-head mb-2">
                              <div className="col-span-4">Chapters List</div>
                              <div className="text-center col-span-4">Ch. 1 - 80</div>
                              <div className="text-right col-span-4">80
                              <IoIosArrowUp  className="icon small" />

                              </div>

                            </div>
                            <div className="rounded flex flex-col gap-2" style={{height: 'auto'}}>
                            {book.chapter.map((chapter, index) => (
                                <div className="bg-accent rounded-sm">
                                  <div >
                                    <div className="flex chapter relative read">
                                      <div className="chapter-grid flex-grow">
                                        <NavLink to={'/'} className="flex flex-grow items-center" style={{gridArea: 'title'}}>
                                          <span className="chapter-link">{chapter}</span>
                                        </NavLink>
                                        <NavLink to={'/'} className="justify-self-start comment-container hover" style={{gridArea: 'comments'}}>
                                          {/* <span>Comment list</span> */}
                                          <FaRegCommentAlt className="icon small mr-1"/>

                                          </NavLink>
                                          <div className="flex items-center justify-self-start " style={{gridArea: 'groups'}}>
                                          <MdOutlineGroup className="icon small text-icon-contrast text-undefined rounded mr-1"/>
                                            <div className="flex items-center space-x-1">
                                              <NavLink to={'/'} className="group-tag lift">No Group</NavLink>
                                            </div>
                                          </div>
                                          <div className="view-count" style={{gridArea:'views'}}>
                                          <FaRegEye className="icon small mr-1" />
                                          <span>N/A</span>
                                          </div>
                                          <div className="user-tag flex items-center justify-self-start " style={{gridArea: 'uploader'}}>
                                          <CiUser className="icon small mr-1" />
                                          <NavLink to={'/'} className="line-clamp-1 break-all px-1 rounded duration-100 pill lift">{book.uploader}</NavLink>
                                          </div>
                                          <div className="flex items-center timestamp justify-self-start" style={{gridArea: 'timestamp'}}>
                                          <FaRegClock className="icon small mr-1" />
                                          <span>N/A</span>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            ))}
                            </div>
                          </div>
                          <div className="flex justify-center flex-wrap gap-2 mt-6">
                              {/* For more chapters later  */}
                              <button className="rounded custom-opacity relative md-btn flex items-center  overflow-hidden accent disbaled text rounded-full px-0">

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
