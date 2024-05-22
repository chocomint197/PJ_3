import React from 'react'
import '../../App.css'
import { NavLink } from 'react-router-dom'
import { GrFormNextLink } from "react-icons/gr";
import bookData from "../../data";
import { GoComment } from "react-icons/go";
import { MdOutlineGroup } from "react-icons/md";

export default function Latestupdate() {
  return (
    <div className="header">
        <div className="flex justify-between items-center text-2xl mb-4 mt-2">
        <NavLink to={"/"}>
        <h2 className="font-header font-semibold">Latest Updates</h2>
        </NavLink>
        <NavLink to={"/"} style={{minHeight: "2.5rem", minWidth: "2.5rem"}} className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text rounded-full px-0">
            <span className="flex relative items-center justify-center font-medium w-full "><GrFormNextLink className="icon"/>
</span>
        </NavLink>
        </div>
        <div className="grid gap-x-6 grid-cols-4">
        <div className="bg-accent">
        <div className="grid gap-4 p-4">
        {bookData.map((book, index) => (
            <div className="flex gap-2">
                <div style={{minWidth: "56px", maxHeight:"56px", height: "100%"}}>
                <NavLink to={"/"} className="item-start select-none w-full h-full flex mb-auto relative">
                    <img src={book.img} alt="manga img" className="rounded shadow-md w-full h-full " style={{width: "50px", height:"70px"}}></img>
                </NavLink>
                </div>
                <div className="flex-grow flex flex-col justify-evenly">
                    <NavLink to={"/"}>
                        <h6 className="font-bold text-base break-all line-clamp-1">{book.name}</h6>
                    </NavLink>
                    <div className="flex items-center justify-between">
                        <NavLink to={"/"} className="flex items-center gap-2 mr-2">
                            <span className="line-clamp-1">{book.chapter[0]}</span>
                        </NavLink>
                        <div className="comment-container hover">
                        <GoComment className="icon small"/>

                        </div>

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                        <MdOutlineGroup className="icon small text-icon rounded icon mr-1"/>
                        {book.group ? (
                        <div className="flex items-center space-x-1">
                            <NavLink to={"/"} className="group-tag">{book.group}</NavLink>
                        </div>

                        ) : (
                            <>
                            <div className="flex items-center space-x-1">
                            </div>
                                <i className="group-tag none">No Group</i>
                          </>
                        )}
                       

                        <span className="timestamp">

                        </span>

                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        </div>
        <div className="bg-accent">
        <div className="grid gap-4 p-4">
        {bookData.map((book, index) => (
            <div className="flex gap-2">
                <div style={{minWidth: "56px", maxHeight:"56px", height: "100%"}}>
                <NavLink to={"/"} className="item-start select-none w-full h-full flex mb-auto relative">
                    <img src={book.img} alt="manga img" className="rounded shadow-md w-full h-full " style={{width: "50px", height:"70px"}}></img>
                </NavLink>
                </div>
                <div className="flex-grow flex flex-col justify-evenly">
                    <NavLink to={"/"}>
                        <h6 className="font-bold text-base break-all line-clamp-1">{book.name}</h6>
                    </NavLink>
                    <div className="flex items-center justify-between">
                        <NavLink to={"/"} className="flex items-center gap-2 mr-2">
                            <span className="line-clamp-1">{book.chapter[0]}</span>
                        </NavLink>
                        <div className="comment-container hover">
                        <GoComment className="icon small"/>

                        </div>

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                        <MdOutlineGroup className="icon small text-icon rounded icon mr-1"/>
                        {book.group ? (
                        <div className="flex items-center space-x-1">
                            <NavLink to={"/"} className="group-tag">{book.group}</NavLink>
                        </div>

                        ) : (
                            <>
                            <div className="flex items-center space-x-1">
                            </div>
                                <i className="group-tag none">No Group</i>
                          </>
                        )}
                       

                        <span className="timestamp">

                        </span>

                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        </div>
        <div className="bg-accent">
        <div className="grid gap-4 p-4">
        {bookData.map((book, index) => (
            <div className="flex gap-2">
                <div style={{minWidth: "56px", maxHeight:"56px", height: "100%"}}>
                <NavLink to={"/"} className="item-start select-none w-full h-full flex mb-auto relative">
                    <img src={book.img} alt="manga img" className="rounded shadow-md w-full h-full " style={{width: "50px", height:"70px"}}></img>
                </NavLink>
                </div>
                <div className="flex-grow flex flex-col justify-evenly">
                    <NavLink to={"/"}>
                        <h6 className="font-bold text-base break-all line-clamp-1">{book.name}</h6>
                    </NavLink>
                    <div className="flex items-center justify-between">
                        <NavLink to={"/"} className="flex items-center gap-2 mr-2">
                            <span className="line-clamp-1">{book.chapter[0]}</span>
                        </NavLink>
                        <div className="comment-container hover">
                        <GoComment className="icon small"/>

                        </div>

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                        <MdOutlineGroup className="icon small text-icon rounded icon mr-1"/>
                        {book.group ? (
                        <div className="flex items-center space-x-1">
                            <NavLink to={"/"} className="group-tag">{book.group}</NavLink>
                        </div>

                        ) : (
                            <>
                            <div className="flex items-center space-x-1">
                            </div>
                                <i className="group-tag none">No Group</i>
                          </>
                        )}
                       

                        <span className="timestamp">

                        </span>

                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        </div>
        <div className="bg-accent">
        <div className="grid gap-4 p-4">
        {bookData.map((book, index) => (
            <div className="flex gap-2">
                <div style={{minWidth: "56px", maxHeight:"56px", height: "100%"}}>
                <NavLink to={"/"} className="item-start select-none w-full h-full flex mb-auto relative">
                    <img src={book.img} alt="manga img" className="rounded shadow-md w-full h-full " style={{width: "50px", height:"70px"}}></img>
                </NavLink>
                </div>
                <div className="flex-grow flex flex-col justify-evenly">
                    <NavLink to={"/"}>
                        <h6 className="font-bold text-base break-all line-clamp-1">{book.name}</h6>
                    </NavLink>
                    <div className="flex items-center justify-between">
                        <NavLink to={"/"} className="flex items-center gap-2 mr-2">
                            <span className="line-clamp-1">{book.chapter[0]}</span>
                        </NavLink>
                        <div className="comment-container hover">
                        <GoComment className="icon small"/>

                        </div>

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                        <MdOutlineGroup className="icon small text-icon rounded icon mr-1"/>
                        {book.group ? (
                        <div className="flex items-center space-x-1">
                            <NavLink to={"/"} className="group-tag">{book.group}</NavLink>
                        </div>

                        ) : (
                            <>
                            <div className="flex items-center space-x-1">
                            </div>
                                <i className="group-tag none">No Group</i>
                          </>
                        )}
                       

                        <span className="timestamp">

                        </span>

                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        </div>
        </div>
    </div>
  )
}
