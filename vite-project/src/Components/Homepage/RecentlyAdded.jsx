import React from 'react'
import '../../App.css'
import { NavLink } from 'react-router-dom'
import { GrFormNextLink } from 'react-icons/gr'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'
import "swiper/swiper-bundle.css";
import bookData from '../../data'
export default function RecentlyAdded() {
  return (
    <div className="header"> 
    <div className="flex justify-between item-center text-2xl mb-4 mt-2">
        <NavLink to={"/"}><h2 className="font-header font-semibold">Recently Added</h2>   </NavLink>
        <NavLink to={"/"} style={{minHeight: "2.5rem", minWidth: "2.5rem"}} className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text rounded-full px-0">
            <span className="flex relative items-center justify-center font-medium w-full "><GrFormNextLink className="icon"/>
</span>
        </NavLink>

    </div>
    <Swiper
     modules={[Pagination]}
      loop={true}

      pagination={{ clickable: true,}}
      className="fill-width"
      >
        {bookData.map((book, index) => (
          <SwiperSlide key={index} className="swiper-slider-3">
            <div>
              <NavLink to={"/"} className="group flex item-start relative mb-auto select-none w-full h-full " style={{aspectRatio: 5 / 7}}>
                <img src={book.img} className="rounded shadow-md w-full h-full" alt="manga img"></img>
              </NavLink>
              <NavLink to={"/"}>
                <h6 className="mt-10 text-sm line-clamp-2">{book.name}</h6>
              </NavLink>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  )
}
