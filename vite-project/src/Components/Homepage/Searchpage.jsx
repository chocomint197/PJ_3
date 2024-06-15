import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Navbarheader from "./Navbarheader";
import { FaArrowLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { LuChevronsUpDown } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
export default function Searchpage() {
  const [mangas, setMangas] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10); 
  const [searchTitle, setSearchTitle] = useState("")
  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await axios.get(`https://pj-3-ug2p.onrender.com/api/v1`);
        setMangas(response.data.data);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchMangas();
  }, []);
  const handlePageClick = (data) => {
    let selected = data.selected;
    setCurrentPage(selected);
  };
  const handleInputChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pj-3-ug2p.onrender.com/api/v1/titles/search?title=${searchTitle}`);
      setMangas(response.data.formattedMangas);
    } catch (error) {
      console.log("Error searching mangas", error);
    }
  };

  const indexOfLastManga = (currentPage + 1) * perPage;
  const indexOfFirstManga = indexOfLastManga - perPage;
  const currentMangas = mangas && mangas.slice(indexOfFirstManga, indexOfLastManga);

  
  // Chuyển đổi trang
  return (
    <div className="flex flex-grow text-color">
      <Navbar />
      <div className="flex flex-col flex-grow bg-dark">
        <Navbarheader />
        <div className="md-content flex-grow">
          <div className="page-container wide">
            <div className="flex items-center mb-6 mt-2">
              <NavLink
                to={"/"}
                className="mr-4 mb-1 text-2xl cursor-pointer rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text rounded-full !px-0 mr-4 mb-1 text-2xl cursor-pointer"
              >
                <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                  <FaArrowLeft className="feather feather-arrow-left icon" />
                </span>
              </NavLink>
              <h2 className="font-header text-2xl">Advanced Search</h2>
            </div>
            <div className="grid gap-2 grid-cols-12">
              <form className="md-inputwrap">
                <input
                  type="text"
                  className="placeholder-current text-color"
                  placeholder="Search"
                  style={{ padding: "0.45rem 3rem" }}
                  value={searchTitle}
                  onChange={handleInputChange}
                />
                <div
                  className="md-search-icon"
                  style={{ left: "0", paddingLeft: "20px", paddingTop: "5px" }}
                >
                  <FaSearch
                    className="icon text-icon-contrast text-undefined"
                    style={{ left: "0.25rem", top: "0.45rem" }}
                  />
                  <div className="md-border"></div>
                </div>
              </form>
              <div className="flex gap-4 justify-end items-center ">
                <button
                  className="mt-auto rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden primary mt-auto"
                  style={{ minHeight: "2.5rem", minWidth: "2.5rem" }}
                  onClick={handleSearch}
                >
                  <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                    <FaSearch className="icon mr-4" />
                    Search
                  </span>
                </button>
              </div>
            </div>
            <div></div>
            <div>
              <div className="grid gap-2 two-col" style={{ marginTop: "20px" }}>
                {currentMangas &&
                  currentMangas.map((manga, index) => (
                    <div className="manga-card" key={manga._id}>
                      <NavLink
                        to={`/title/${manga._id}`}
                        style={{ gridArea: "title" }}
                        className="font-15 font-semibold"
                      >
                        <span>{manga.title}</span>
                      </NavLink>
                      <div
                        className="manga-card-cover"
                        style={{ gridArea: "art" }}
                      >
                        <NavLink
                          to={`/title/${manga._id}`}
                          className="group flex items-start relative mb-auto select-none aspect cover"
                        >
                          <img src={manga.images} alt="Manga cover" />
                        </NavLink>
                      </div>
                      <div
                        className="flex flex-wrap status mb-auto"
                        style={{ gridArea: "status" }}
                      >
                        <span className="tag lift dot">
                          <GoDotFill
                            className="icon"
                            style={{
                              color:
                                manga.status === "Ongoing"
                                  ? "rgb(var(--md-status-green))"
                                  : manga.status === "Completed"
                                  ? "rgb(var(--md-status-blue))"
                                  : "initial",
                            }}
                          />
                          {manga.status}
                        </span>
                      </div>

                      <div
                        className="flex flex-wrap gap-1 tags-row tags self-start"
                        style={{ maxHeight: "calc(1em + 0rem)", marginBottom: '10px'}}
                      >
                        { manga.genre.map((genre, index) => (
                          <NavLink
                            to={"/"}
                            className="tag bg-accent"
                            key={index}
                          >
                            {genre}
                          </NavLink>
                        ))}
                      </div>
                      <div
                        className="py-0 description"
                        style={{ gridArea: "description" }}
                      >
                        <div className="md-md-container dense">
                          <p>{manga.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex justify-center flex-wrap gap-2 mt-6 pagination">
            {mangas && mangas.length > perPage && (
                <ReactPaginate
                  previousLabel={"←"}
                  nextLabel={"→"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(mangas.length / perPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
