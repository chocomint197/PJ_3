import React from 'react'
import Navbar from './Navbar'
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import PopularNewTitle from './PopularNewTitle';
import Latestupdate from './Latestupdate';
import Popular from './Popular';
import RecentlyAdded from './RecentlyAdded';
import Navbarheader from './Navbarheader';
export default function Homepage() {
  return (
    <div className="flex flex-grow">
         <Navbar/>
        <div className="flex flex-col flex-grow" style={{backgroundColor: "rgb(27, 26, 27)"}}>
            {/* Search bar */}
            <Navbarheader/>
        <div className="md-content flex-grow">
        {/* Popular new title section */}
        <PopularNewTitle/>
        <div className="page-container wide ">
        <Latestupdate/>
        <Popular/>
        <RecentlyAdded/>
        </div>
        </div>
        </div>
       
    </div>
  )
}
