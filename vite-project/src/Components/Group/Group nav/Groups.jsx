import React from 'react'
import '../../../App.css'
import '../Groupstyle.css'
import { IoArrowBack } from "react-icons/io5";

import Navbar from '../../Homepage/Navbar'
import Navbarheader from '../../Homepage/Navbarheader'
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
export default function Groups() {
  return (
    <div className="flex flex-grow text-color">
        <Navbar/>
        <div className="flex flex-col flex-grow">
        <Navbarheader/>
        <div className="h-[var(--navbar-height)]"></div>
        <div className="md-content flex-grow" style={{background: 'rgb(25,26,28)'}}>
            <div className="page-container wide">
                <div className="flex items-center mb-6 mt-2">
                    <button className="text-2xl cursor-pointer rounded custom-opacity relative md-btn flex items-center overflow-hidden accent text rounded-full px-0 mr-4 mb-1 text-2xl cursor-pointer">
                        <span className="flex relative items-center justify-center font-medium select-none w-full"><IoArrowBack className="icon text-color"/>
</span>
                    </button>
                    <h2 className="font-header text-2xl font-semibold">Search Groups</h2>
                </div>
                <div>
                    <div className="flex mb-6">
                        <form method="GET" className="md-inputwrap" style={{background: 'rgb(var(--md-accent))'}}>
                            <input type="text" title="Search" autoComplete='off' placeholder='Search' style={{padding: '.45rem 3rem', color: '#fff'}}/>
                            <div className="md-search-icon" style={{left: '.25rem'}}>
                            <FaSearch className="icon text-icon-contrast text-undefined" />

                            </div>
                            <div className="md-border">

                            </div>
                        </form>
                    </div>
                    <div className="grid grid-cols-1 gap-2 group-card-list grid-cols-4">
                        {/* map groups */}
                        <NavLink to={'/group/profile'} className="group-card">
                            <div className="group-head">
                                <img src="https://mangadex.org/img/avatar.png" alt="group avatar" style={{width: '32px',height: '32px'}} className="group-avatar"/>
                                <div className="line-clamp-1 break-all" style={{fontSize: '14px'}}>Group 1</div>
                            </div>
                        </NavLink>
                    </div>
                    {/* for nav arrow page */ }
                    <div className="flex justify-center flex-wrap gap-2 my-6">

                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}
