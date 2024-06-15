import React, { useEffect, useState } from 'react'
import '../../App.css'
import { NavLink } from 'react-router-dom'
import { GrFormNextLink } from "react-icons/gr";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination  } from 'swiper/modules';
import axios from 'axios';

export default function Popular() {
  const [popular, setPopular] = useState(null)
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await axios.get(`https://pj-3-ug2p.onrender.com/api/v1/`);
        setPopular(response.data.data);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchPopular();
  }, []);
  return (
    <div className="header">
    <div className="flex justify-between items-center text-2xl mb-4 mt-2">
      <NavLink to={"/"}> <h2 className="font-header font-semibold">Popular</h2></NavLink>
      <NavLink to={"/"} style={{minHeight: "2.5rem", minWidth: "2.5rem"}} className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text rounded-full px-0">
            <span className="flex relative items-center justify-center font-medium w-full "><GrFormNextLink className="icon"/>
</span>
        </NavLink>
      </div>     
      <Swiper
     modules={[Pagination]}
      loop={true}
      slidesPerGroup={7} 
      slidesPerView={7}
      pagination={{ clickable: true,}}
      className="fill-width"
      >
        {popular &&   popular.map((manga, index) => (
          <SwiperSlide key={index} className="swiper-slide-2">
            <div>
              <NavLink to={`/title/${manga._id}`} className="group flex item-start relative mb-auto select-none w-full h-full " style={{aspectRatio: 5 / 7}}>
                <img src={manga.images} className="rounded shadow-md w-full h-full" alt="manga img"></img>
              </NavLink>
              <NavLink to={`/title/${manga._id}`}>
                <h6 className="mt-10 text-sm line-clamp-2">{manga.title}</h6>
              </NavLink>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>

    
    </div>
  ) 
}
