import React from "react";
import "../../App.css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay  } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GrFormPrevious, GrFormNext  } from "react-icons/gr";

import "swiper/swiper-bundle.css";
import { NavLink } from "react-router-dom";
import bookData from "../../data";

export default function PopularNewTitle() {
  const onSwiperInit = (swiper) => {
    swiper.wrapperEl.style.maxWidth = '1664px';
  }; 
   return (
    <div className="relative fixed p-0 m-0 top-16 left-0 w-full" style={{top: "0rem"}}>
      <div className="absolute top-16 left-0 w-full z-[5]">
      <div className="max-w-[1440px]  px-4" style={{marginLeft: "110px"}} >
          <h2 className="font-header text-2xl" style={{color: "white"}}>Popular New Titles</h2>
        </div>
      </div>
      <div>
        <Swiper
           modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            prevEl: '.prev',
            nextEl: '.next',
          }}
          slidesPerGroup={1}
          speed={500}

          autoplay={{
            delay: 3000, 
            disableOnInteraction: false,
          }}
                    onSwiper={onSwiperInit}
          loop={true}
        >
               {bookData.map((book, index) => (
                
          <SwiperSlide  style={{width: "1664px"}} key={index}>
            <NavLink
              to={`/title/${book.id}`}
              style={{ height: "440px" }}
              className="flex relative h-full overflow-hidden shadow banner-bg"
            >
                <img src={book.img} alt="Cover" className="absolute left-0 top-0 w-[100%] h-[150%] object-cover select-none " style={{objectPosition: "0px 30%"}}/>
                <div className="absolute banner-bg inset-0"></div>
                <div className="p-4 py-4 px-4 grid-rows-1 grid gap-2 w-full mx-auto mt-auto container-swiper max-w-[1440px]" style={{height: "77%"}}>
                    <div className="h-full relative z-20 flex gap-4">
                        <NavLink className="h-full flex item-start relative mb-auto select-none w-full w-auto object-top object-cover rounded shadow-lg bg-transparent" style={{ aspectRatio: 7 / 10}}> 
                        <img src={book.img} alt="" className="shadow-md rounded w-full h-full" />
                        </NavLink>
                        <div className="mt-auto grid gap-2 h-full" style={{minHeight: "0px", gridTemplateRows: "max-content min-content auto max-content"}}>
                            <h2 className="font-bold text-4xl line-clamp-2 overflow-hidden" style={{lineHeight: "2.75rem"}}>{book.name}</h2>
                            <div className="flex flex-wrap gap-1 select-none overflow-hidden">
                                {book.categories.map((category, i) => (
                                    <span key={i} className="tag bg-accent">{category}</span>
                                ))}
                            </div>
                            <div className="preview-description">
                                <div className="py-2 relative overflow-hidden py-0">
                                    <p>{book.description}</p>
                                </div>
                            </div>
                            <div className="truncate mr-36">
                                <span className="font-medium italic">{book.uploader}</span>
                            </div>
                        </div>
                    </div>
                </div>
           
            </NavLink>
          </SwiperSlide>
               ))}
               <div className="absolute w-full bottom-2 left-0  z-[3]" style={{maxWidth: "1664px"}}>
                <div className="flex justify-end items-center gap-4 max-w-[1440px] mx-auto px-4">
                    <button className="prev p-1 pointer-events-auto  custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text rounded-full px-0" style={{minWidth: "2.5rem", minHeight: "2.5rem"}}>
                        <span className="flex relative items-center justify-center font-medium select-none w-full"><GrFormPrevious className="icon"/></span>

                    </button>
                    <button className="next p-1 pointer-events-auto  custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text rounded-full px-0" style={{minWidth: "2.5rem", minHeight: "2.5rem"}}>
                        <span className="flex relative items-center justify-center font-medium select-none w-full"><GrFormNext  className="icon"/></span>

                    </button>
                </div>
               </div>
        </Swiper>
        </div>
    </div>
  );
}
