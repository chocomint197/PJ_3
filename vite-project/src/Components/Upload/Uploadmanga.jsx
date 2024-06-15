import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import Navbarheader from "../Homepage/Navbarheader";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

export default function Uploadmanga() {
  const [selectedButton, setSelectedSection] = useState("All");
  const [openMenu, setOpenMenu] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const guidelineRef = useRef(null);
  const [tags, setTags] = useState({
    format: [],
    genre: [],
    theme: [],
    contentRating: [],
    status: [],
  });
  const [selectedTags, setSelectedTags] = useState({
    format: [],
    genre: [],
    theme: [],
  });
  const scrollToGuideline = () => {
    if (guidelineRef.current) {
      guidelineRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const getListTags = async () => {
      try {
        const response = await axios.get(
          `https://pj-3-ug2p.onrender.com/api/v1/title/list/tags`
        );
        setTags(response.data.tagsEnum);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    getListTags();
  }, []);

  const handleButtonClick = (itemName) => {
    setSelectedSection(itemName);
  };

  const handleToggleMenu = (menuName) => {
    setOpenMenu((prevMenu) => ({
      ...prevMenu,
      [menuName]: !prevMenu[menuName],
    }));
  };
  const handleSelectOption = (menuName, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [menuName]: option,
    }));
    setOpenMenu({});
  };

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".md-select-inner-wrap") &&
      Object.keys(openMenu).length > 0
    ) {
      setOpenMenu({});
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenu]);

  const [upload, setUpload] = useState(null);
  const [file, setFile] = useState(null)
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setUpload(URL.createObjectURL(file));
      setFile(file)
    }
  };
  const handleResetUpload = () => {
    if (upload) {
      URL.revokeObjectURL(upload);
      setFile(null)
      setUpload(null);
    }
  };

  const handleTagClick = (category, tag) => {
    setSelectedTags((prevTags) => {
      const newSelectedTags = { ...prevTags };
      const isTagSelected = newSelectedTags[category].includes(tag);

      if (isTagSelected) {
        newSelectedTags[category] = newSelectedTags[category].filter(
          (selectedTag) => selectedTag !== tag
        );
      } else {
        newSelectedTags[category] = [...newSelectedTags[category], tag];
      }

      return newSelectedTags;
    });
  };


    //form data
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [artist, setArtist] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [description, setDescription] = useState("")
    const navigate = useNavigate();
  const token = localStorage.getItem('token')

    const postNewManga = async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description)
      formData.append("author", author);
      formData.append("artist", artist);
      formData.append("contentRating", selectedOptions.contentRating);
      formData.append("status", selectedOptions.status);
      formData.append("publicDate", publicationYear);
      formData.append("format", JSON.stringify(selectedTags.format));
      formData.append("genre", JSON.stringify(selectedTags.genre));
      formData.append("theme", JSON.stringify(selectedTags.theme))
      
      if (file) {
        formData.append("images", file);
      }
  
      try {
        const response = await axios.post(
          "http://localhost:1050/api/v1/title/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              'authorization': `Bearer ${token}`
            },
          }
        );
        alert('Manga uploaded successful')
        navigate('/')
      } catch (error) {
        console.error("Error uploading manga", error);
      }
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
              <h2 className="font-header text-2xl font-semibold">
                Upload Manga
              </h2>
            </div>
            <div>
              <div className="flex">
                <div className="button-menu">
                  <button
                    className={`rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden ${
                      selectedButton === "All" ? "primary" : ""
                    }`}
                    onClick={() => handleButtonClick("All")}
                    style={{ minHeight: "1.625rem", minWidth: "3rem" }}
                  >
                    <span className="flex relative items-center justify-center font-medium select-none w-full text-color">
                      All
                    </span>
                  </button>
                  <button
                    className={`rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden ${
                      selectedButton === "Titles" ? "primary" : ""
                    }`}
                    onClick={() => handleButtonClick("Titles")}
                    style={{ minHeight: "1.625rem", minWidth: "3rem" }}
                  >
                    <span className="flex relative items-center justify-center font-medium select-none w-full text-color">
                      Titles
                    </span>
                  </button>
                  <button
                    className={`rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden ${
                      selectedButton === "Metadata" ? "primary" : ""
                    }`}
                    onClick={() => handleButtonClick("Metadata")}
                    style={{ minHeight: "1.625rem", minWidth: "3rem" }}
                  >
                    <span className="flex relative items-center justify-center font-medium select-none w-full text-color">
                      Metadata
                    </span>
                  </button>
                  <button
                    className={`rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden ${
                      selectedButton === "Tags" ? "primary" : ""
                    }`}
                    onClick={() => handleButtonClick("Tags")}
                    style={{ minHeight: "1.625rem", minWidth: "3rem" }}
                  >
                    <span className="flex relative items-center justify-center font-medium select-none w-full text-color">
                      Tags
                    </span>
                  </button>
                  <button
                    className={`rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden ${
                      selectedButton === "Covers" ? "primary" : ""
                    }`}
                    onClick={() => handleButtonClick("Covers")}
                    style={{ minHeight: "1.625rem", minWidth: "3rem" }}
                  >
                    <span className="flex relative items-center justify-center font-medium select-none w-full text-color">
                      Covers
                    </span>
                  </button>
                </div>
                <div className="mr-4 mb-0"></div>
                <div className="mb-4 flex flex-col flex-auto" id="draft-form">
                  <div className="mb-2">
                    <div
                      className="flex items-center rounded justify-center py-4 px-6 mt-2 mb-6 bg-primary text-white my-6 cursor-pointer"
                      role="alert"
                      onClick={() => {
                        scrollToGuideline();
                      }}
                    >
                      <span className="text-center break-word overflow-auto">
                        <span className="text-white cursor-pointer select-none font-20">
                          Make sure to read the guidelines!
                        </span>
                      </span>
                    </div>
                    <div>
                      <div
                        className="input-container"
                        style={{
                          display:
                            selectedButton === "Titles" ||
                            selectedButton === "All"
                              ? " "
                              : "none",
                        }}
                      >
                        <div className="label mt-6">
                          <div className="required">Title</div>
                        </div>
                        <div>
                          <div className="grid grid-cols-1 gap-2">
                            <div>
                              <div>
                                <div className="text-item-container">
                                  <div className="relative flex-grow min-w-0 ">
                                    <input
                                      type="text"
                                      className="inline-input text-color"
                                      
                                      value={title}
                                      onChange={(e) => setTitle(e.target.value)}
                                      placeholder="Manga title"
                                    />
                                    <div className="absolute top-0 opacity-60 pointer-events-none pl-1 width-full line-clamp-1 break-all"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="label mt-6">
                          <div className="required">Description</div>
                        </div>
                        <div>
                          <div className="grid grid-cols-1 gap-2">
                            <div>
                              <div>
                                <div className="text-item-container">
                                  <div className="relative flex-grow min-w-0 ">
                                    <input
                                      type="text"
                                      className="inline-input text-color"
                                      
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                                      placeholder="Description"
                                    />
                                    <div className="absolute top-0 opacity-60 pointer-events-none pl-1 width-full line-clamp-1 break-all"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="border-1 my-4 border-accent-20 my-6" />
                    <div
                      style={{
                        display:
                          selectedButton === "Metadata" ||
                          selectedButton === "All"
                            ? " "
                            : "none",
                      }}
                    >
                      <div>
                        <div className="header required">Author</div>
                      </div>
                      <div>
                        <div className="relative">
                          <form
                            className="md-inputwrap mb-2"
                            style={{ borderRadius: "0px" }}
                          >
                            <input
                              type="text"
                              placeholder="Author name"
                              className="text-color"
                              value={author}
                              onChange={(e) => setAuthor(e.target.value)}
                              
                            />
                            <div className="md-border"></div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display:
                          selectedButton === "Metadata" ||
                          selectedButton === "All"
                            ? " "
                            : "none",
                      }}
                    >
                      <div className="header required">Artists</div>
                      <div>
                        <div className="relative">
                          <form
                            className="md-inputwrap mb-2"
                            style={{ borderRadius: "0px" }}
                          >
                            <input
                              type="text"
                              placeholder="Artist name"
                              className="text-color"
                              value={artist}
                              onChange={(e) => setArtist(e.target.value)}
                            />
                            <div className="md-border"></div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <hr className="border-1 my-4 border-accent-20 my-6" />
                    <div className="my-8">
                      <div
                        className="grid grid-cols-3 gap-8"
                        style={{
                          display:
                            selectedButton === "Tags" ||
                            selectedButton === "All"
                              ? " "
                              : "none",
                        }}
                      >
                        <div className="order-none">
                          <div className="header-required no-top">
                            Content Rating
                          </div>
                          <div
                            className="md-select-inner-wrap rounded cursor-pointer block"
                            style={{ height: "58px" }}
                          >
                            <div
                              className="relative w-full md-select-inner"
                              tabIndex="0"
                              onClick={() => handleToggleMenu("contentRating")}
                            >
                              <div className="md-select flex items-center relative">
                                <div className="absolute top-4 transition-label with-placeholder font-15">
                                  {selectedOptions.contentRating || (
                                    <div className="md-select-placeholder">
                                      Select a Content Rating
                                    </div>
                                  )}
                                </div>
                                <div
                                  className="absolute right-0 flex items-center justify-center h-full top-0"
                                  style={{ top: "30px" }}
                                >
                                  <IoIosArrowDown
                                    className={`transform transition-transform ${
                                      openMenu.contentRating ? "rotate-180" : ""
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                            {openMenu.contentRating && (
                              <div className="absolute w-full z-[3] bg-accent border border-primary rounded left-0 mt-3">
                                {tags.contentRating.map((option) => (
                                  <div
                                    key={option}
                                    className="px-4 py-2 hover:bg-accent-10 active:bg-accent-10 cursor-pointer font-15"
                                    onClick={() =>
                                      handleSelectOption(
                                        "contentRating",
                                        option
                                      )
                                    }
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="order-none">
                          <div className="header-required no-top">Status</div>
                          <div
                            className="md-select-inner-wrap rounded cursor-pointer block"
                            style={{ height: "58px" }}
                          >
                            <div
                              className="relative w-full md-select-inner"
                              tabIndex="0"
                              onClick={() => handleToggleMenu("status")}
                            >
                              <div className="md-select flex items-center relative">
                                <div className="absolute top-4 transition-label with-placeholder font-15">
                                  {selectedOptions.status || (
                                    <div className="md-select-placeholder ">
                                      Select a Status
                                    </div>
                                  )}
                                </div>
                                <div
                                  className="absolute right-0 flex items-center justify-center h-full top-0"
                                  style={{ top: "30px" }}
                                >
                                  <IoIosArrowDown
                                    className={`transform transition-transform ${
                                      openMenu.status ? "rotate-180" : ""
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                            {openMenu.status && (
                              <div className="absolute w-full z-[3] bg-accent border border-primary rounded left-0 mt-3">
                                {tags.status.map((option) => (
                                  <div
                                    key={option}
                                    className="px-4 py-2 hover:bg-accent-10 active:bg-accent-10 cursor-pointer font-15"
                                    onClick={() =>
                                      handleSelectOption("status", option)
                                    }
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="order-none">
                          <div className="header no-top">Publication Year</div>
                          <div className="md-select focus:outline-none">
                            <div className="md-input">
                              <div className="md-inputwrap">
                                <input
                                  name="publicDate"
                                  type="number"
                                  value={publicationYear}
                                  onChange={(e) => setPublicationYear(e.target.value)}

                                  className="placeholder-current p-4 text-color"
                                  placeholder="Publication Year"
                                  style={{ padding: "1rem", height: "58px" }}
                                />
                                <div className="mr-border"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display:
                            selectedButton === "Tags" ||
                            selectedButton === "All"
                              ? " "
                              : "none",
                        }}
                      >
                        <div className="header">Format</div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2">
                            {tags.format.map((format, index) => (
                              <span
                                className={`chip flex items-center ${
                                  selectedTags.format.includes(format)
                                    ? "include"
                                    : ""
                                }`}
                                key={index}
                                onClick={() => handleTagClick("format", format)}
                              >
                                {format}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="header">Genre</div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2">
                            {tags.genre.map((genre, index) => (
                              <span
                                className={`chip flex items-center ${
                                  selectedTags.genre.includes(genre)
                                    ? "include"
                                    : ""
                                }`}
                                key={index}
                                onClick={() => handleTagClick("genre", genre)}
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="header">Theme</div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2">
                            {tags.theme.map((theme, index) => (
                              <span
                              className={`chip flex items-center ${
                                selectedTags.theme.includes(theme) ? "include" : ""
                              }`}
                                key={index}
                                onClick={() => handleTagClick("theme", theme)}

                              >
                                {theme}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="border-1 my-4 border-accent-20 my-6" />
                    <div
                      style={{
                        display:
                          selectedButton === "Covers" ||
                          selectedButton === "All"
                            ? " "
                            : "none",
                      }}
                    >
                      <div className="flex justify-center"></div>
                      <div className="input-container">
                        <div className="label mt-6">
                          <div className="required">Covers</div>
                        </div>
                        <div>
                          <div className="header-subtext">
                            Use the original cover in the original language when
                            possible. At least 1 cover in the original language
                            in all cases. Prefer the best quality available. The
                            format must be JPEG, PNG, or GIF and portrait aspect
                            ratio is preferred.
                          </div>
                          <div className="grid gap-3 grid-cols-7">
                            <div className="wrap flex-grow-0">
                              <div className="page-sizer">
                                {upload ? (
                                  <div
                                    className="page"
                                    style={{
                                      backgroundImage: `url(${upload})`,
                                      backgroundSize: "cover",
                                    }}
                                  >
                                    <button
                                      className="close"
                                      onClick={handleResetUpload}
                                    >
                                      <RxCross2 className="icon small text-white" />
                                    </button>
                                  </div>
                                ) : (
                                  <label
                                    htmlFor="file"
                                    className="page placeholder"
                                  >
                                    <i className="icon text-icon-contrast text-undefined plus"></i>
                                    <div className="text-center font-15">
                                      Click or drag to add files
                                    </div>
                                  </label>
                                )}
                              </div>
                            </div>
                          </div>
                          <input
                            type="file"
                            id="file"
                            name="file"
                            multiple
                            accept="image/jpeg,image/jpg,image/png,image/gif"
                            style={{ display: "none" }}
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="border-1 my-4 border-accent-20 my-6" />
                    <div className="actions-cover"></div>
                    <div className="actions-1 actions sticky">
                      <button
                        className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent"
                        style={{ minHeight: "3rem", minWidth: "13.75rem" }}
                      >
                        <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                          Cancel
                        </span>
                      </button>
                      <button
                        className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent primary"
                        style={{ minHeight: "3rem", minWidth: "13.75rem" }}
                        onClick={postNewManga}
                      >
                        <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                          Save
                        </span>
                      </button>
                    </div>
                    <hr className="border-1 my-4 border-accent-20 my-6" />
                    <div
                      className="bg-background rounded"
                      id="draft-guideline"
                      ref={guidelineRef}
                    >
                      <div className="flex text-xl px-6 py-4">
                        Manga Guidelines
                      </div>
                      <div className="text-sm px-6 pb-5 f">
                        <div className="font-bold text-status-red mt-2">
                          Do not create entries for:
                        </div>
                        <ul className="list-disc ml-6">
                          <li>Western comics (e.g. Marvel),</li>
                          <li>
                            Comics you made yourself without first getting
                            permission from a staff member
                          </li>
                          <li>Duplicates of an already existing manga</li>
                        </ul>
                        <div className="font-bold mt-2">General :</div>
                        <ul className="list-disc ml-6">
                          <li>At least 1 cover</li>
                          <li>
                            If your role allows you to pick the main cover, use
                            that of the latest volume, unless it either doesn't
                            fit the overall art style or theme of the title or
                            has major spoilers.
                          </li>
                          <li>
                            You may only create a duplicate entry for the
                            official and fan colored version of a series.
                          </li>
                          <li>
                            Attempting to create troll/spam entries will result
                            in permissions being revoked.
                          </li>
                          <li>Remember to submit your entry when finished.</li>
                        </ul>
                        <div className="font-bold mt-2">
                          Cover file requirements and limits:
                        </div>
                        <ul className="list-disc ml-6">
                          <li>
                            A cover can be at most (10000 x 10000) pixels.
                          </li>
                          <li>
                            Portrait orientation covers are preferred whenever
                            possible.
                          </li>
                          <li>Max file size per image is 20 MB.</li>
                          <li>
                            Supported image formats are JPEG, PNG, and GIF.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
