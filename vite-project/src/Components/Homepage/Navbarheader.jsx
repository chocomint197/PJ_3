import React from 'react'

import '../../App.css'
import { FaRegUser } from 'react-icons/fa'
import { CiSearch } from 'react-icons/ci'
import { NavLink } from 'react-router-dom'
export default function Navbarheader() {
  const loginCheck = localStorage.getItem('token')
  const id = localStorage.getItem('userInfo')
  return (
    <div className="navbar-wrap flex flex-col transparent header-hidden ma fixed top-0 right-0 max-w">
    <div className="navbar-main flex">
      <div className="nav-bar flex flex-grow justify-end w-full items-center gap-2">
        <div
          className="flex min-w fit mr-auto"
          style={{ display: "none" }}
        ></div>
        <div className="flex justify-end max-w-[50rem]">
          <div
            className="nav-bar-search flex flex-grow w-full"
            style={{ zIndex: 12 }}
          >
            <form action="/search" method="GET" className="md-inputwrap">
              <input
                type="text"
                className="header-search-input"
                placeholder="Search"
                title="Search"
              />
              <div className="md-border"></div>
              <div className="md-search-icon">
                <CiSearch className="icon small" />
              </div>
              <div className="md-search-hint">
                <span className="hint-icon">Ctrl</span>
                <span className="hint-icon">K</span>
              </div>
            </form>
          </div>
          <div
            className="ml-2 ml-4 cursor-pointer bg-accent rounded-full flex items-center justify-center"
            style={{ minWidth: "40px", minHeight: "40px" }}
          >
            {loginCheck ? (
                <NavLink to={`/user/profile/${id}`}>
                  <img src="https://mangadex.org/img/avatar.png" className="icon icon-large"/>

                </NavLink>
              ) : (
                <NavLink to={'/user/login'}>
                  <FaRegUser className="icon icon-large" />

                </NavLink>
              )}
          </div>
        </div>
      </div>
    </div>
    
  </div>
  )
}
