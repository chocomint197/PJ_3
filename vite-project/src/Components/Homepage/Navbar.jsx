import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { IoHomeOutline, IoBookOutline  } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
import { MdOutlineStickyNote2 } from "react-icons/md";
import "../../App.css"
export default function Navbar() {
  const [selectedSection, secSelectedSection] = useState('Home');
  const handleItemClick = (itemName) => {
    secSelectedSection(itemName);
  };
  return (
    <div className="flex  bg-accent flex-col z-auto">
      <div className="drawer" style={{marginLeft: "0px", transition:"margin-left 150ms ease-in-out 0s"}}>
        <div className="lg top sticky overscroll-contain overflow-y-auto h-screen flex flex-col">
          <div className="mx-4 py-2 flex-shrink-0 flex justify-between items-center">
            <NavLink to={"/"} className="md-logo-wrap">
              <NavLink to={"/"}>
                {" "}
                <img
                  src="https://mangadex.org/img/brand/mangadex-logo.svg"
                  alt="logo"
                  style={{ width: "40px", height: "34px" }}
                />
              </NavLink>
              <NavLink to={"/"}>
                {" "}
                <img
                  src="https://mangadex.org/img/brand/mangadex-wordmark.svg"
                  alt="logo"
                  style={{ width: "112px", height: "32px", objectFit: "none"}}
                  className="dark"
                  
                />
              </NavLink>
            </NavLink>
          </div>
          <div
            className="px-4 pt-2 flex flex-col flex-shrink-0"
            id="home-section"
          >
            <NavLink to={"/"} className="flex-shrink-0">
              <div className={`list__item px-2 font-bold  menu__item--hover-hightlight ${selectedSection === 'Home' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Home')} >
                <div>
                  <IoHomeOutline
                    className="icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
                <div className="mx-2"> Home</div>
              </div>
            </NavLink>
          </div>
          <div
            id="follows-section"
            className="pt-2 px-4 flex-col flex-shrink-0 flex"
          >
            <div className="list__item">
              <div>
                <FaRegBookmark className="icon" />
              </div>
              <div className="mx-2 font-bold" >Follows</div>
            </div>
            <NavLink to={"/titles/feed"}  className="flex-shrink-0">
                <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'Update' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Update')}>
                    <div className="mx-2">Update</div>
                </div>
            </NavLink>
            <NavLink to={"/titles/follows" } className="flex-shrink-0">
            <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'Library' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Library')}>
                    <div className="mx-2">Library</div>
                </div>
            </NavLink>
            <NavLink to={"/my/lists"} className="flex-shrink-0">
            <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'MDList' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('MDList')}>
                    <div className="mx-2">MDList</div>
                </div>
            </NavLink>
            <NavLink to={"/my/groups"} className="flex-shrink-0">
            <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'My Groups' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('My Groups')}>
                    <div className="mx-2">My Groups</div>
                </div>
            </NavLink>
            <NavLink to={"/my/history"} className="flex-shrink-0">
            <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'Reading History' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Reading History')}>
                    <div className="mx-2">Reading History</div>
                </div>
            </NavLink>
          </div>
          <div id="title-section" className="px-4 pt-2 flex flex-col flex-shrink-0">
          <div className="list__item">
              <div>
                <IoBookOutline   className="icon" />
              </div>
              <div className="mx-2 font-bold" >Titles</div>
            </div>
            <NavLink to={"/titles"}  className="flex-shrink-0">
                <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'Advenced Search' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Advenced Search')}>
                    <div className="mx-2">Advenced Search</div>
                </div>
            </NavLink>
            <NavLink to={"/titles/recent"}  className="flex-shrink-0">
                <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'Recently Added' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Recently Added')}>
                    <div className="mx-2">Recently Added</div>
                </div>
            </NavLink>
            <NavLink to={"/titles/latest"}  className="flex-shrink-0">
                <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'Latest Update' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Latest Update')}>
                    <div className="mx-2">Latest Updates</div>
                </div>
            </NavLink>
            <NavLink to={"/titles/random"}  className="flex-shrink-0">
                <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'Random' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Random')}>
                    <div className="mx-2">Random</div>
                </div>
            </NavLink>
          </div>
          <div id="community-section" className="px-4 pt-2 flex flex-col flex-shrink-0">
          <div className="list__item">
              <div>
                <SlPeople  className="icon" />
              </div>
              <div className="mx-2 font-bold" >Community</div>
            </div>
            <NavLink to={"/groups"}  className="flex-shrink-0">
                <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'Groups' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Groups')}>
                    <div className="mx-2">Groups</div>
                </div>
            </NavLink>
            <NavLink to={"/users"}  className="flex-shrink-0">
                <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'Users' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Users')}>
                    <div className="mx-2">Users</div>
                </div>
            </NavLink>
          </div>
          <div id="moreinfo-section" className="px-4 pt-2 flex flex-col flex-shrink-0">
          <div className="list__item">
              <div>
                <MdOutlineStickyNote2  className="icon" />
              </div>
              <div className="mx-2 font-bold" >More info</div>
            </div>
            <NavLink to={"/rules"}  className="flex-shrink-0">
                <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'Site Rules' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Site Rules')}>
                    <div className="mx-2">Site Rules</div>
                </div>
            </NavLink>
            <NavLink to={"/announcements"}  className="flex-shrink-0">
                <div className={`list__item px-2 menu__item--hover-hightlight ${selectedSection === 'Announcements' ? 'menu__item--active' : ''}`} onClick={() => handleItemClick('Announcements')}>
                    <div className="mx-2">Announcements</div>
                </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
