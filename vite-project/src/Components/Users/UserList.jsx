import React, { useEffect, useState } from "react";
import Navbar from "../Homepage/Navbar";
import Navbarheader from "../Homepage/Navbarheader";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { Formik, Form, Field } from "formik";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1050/api/v1/users/lists"
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const initialValues = {
    keyword: "",
  };

  

  const onSubmit = (values) => {
    console.log("Search keyword:", values.keyword);
  };

  return (
    <div className="flex flex-grow text-color">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <Navbarheader />
        <div className="h-[var(--navbar-height)]"></div>
        <div
          className="md-content flex-grow"
          style={{ background: "rgb(25,26,28)" }}
        >
          <div className="page-container wide">
            <div className="flex items-center mb-6 mt-2">
              <button className="text-2xl cursor-pointer rounded custom-opacity relative md-btn flex items-center overflow-hidden accent text rounded-full px-0 mr-4 mb-1 text-2xl cursor-pointer">
                <span className="flex relative items-center justify-center font-medium select-none w-full">
                  <IoArrowBack className="icon text-color" />
                </span>
              </button>
              <h2 className="font-header text-2xl font-semibold">
                Search Users
              </h2>
            </div>
            <div>
              <div className="flex mb-6">
              <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                >
                  <Form
                    className="md-inputwrap"
                    style={{ background: "rgb(var(--md-accent))" }}
                  >
                    <Field
                      type="text"
                      title="Search"
                      autoComplete="off"
                      placeholder="Search"
                      style={{ padding: ".45rem 3rem", color: "#fff" }}
                      name="keyword"
                    />
                    <div className="md-search-icon" style={{ left: ".25rem" }}>
                      <FaSearch className="icon text-icon-contrast text-undefined" />
                    </div>
                    <div className="md-border"></div>
                    
                    <button type="submit" className="hidden"></button>
                  </Form>
                </Formik>
              </div>
              <div className="grid gap-2 group-card-list grid-cols-4">
                {users.map((user, index) => (
                  <NavLink
                    to={`/user/profile/${user._id}`}
                    className="user-card"
                    key={index}
                  >
                    <div className="user-head">
                      <img
                        src={
                          "https://mangadex.org/img/avatar.png"
                        }
                        alt="user avatar"
                        style={{ width: "32px", height: "32px" }}
                        className="user-avatar"
                      />
                      <div
                        className="line-clamp-1 break-all"
                        style={{ fontSize: "14px" }}
                      >
                        {user.userName}
                      </div>
                      <div className="ml-auto">
                        <div className="role-tag" style={{backgroundColor: 'rgb(250,250,250', color: 'rgb(0,0,0)'}}>
                            {user.role[0]}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
              {/* for nav arrow page */}
              <div className="flex justify-center flex-wrap gap-2 my-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
