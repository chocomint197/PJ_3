import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import Navbarheader from "../Homepage/Navbarheader";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

export default function Uploadmanga() {
  const [selectedButton, setSelectedSection] = useState("All");
  const [openMenu, setOpenMenu] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const guidelineRef = useRef(null);
  const scrollToGuideline = () => {
    if (guidelineRef.current) {
      guidelineRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const menus = [
    {
      name: "contentRating",
      options: ["Safe", "Suggestive", "Erotica", "Pornographic"],
      placeholder: "Select Rating",
    },
    {
      name: "publicationStatus",
      options: ["Ongoing", "Completed", "Hiatus", "Cancelled"],
      placeholder: "Select Status",
    },
  ];

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUpload(URL.createObjectURL(file));
    }
  };
  const handleResetUpload = () => {
    if (upload) {
      URL.revokeObjectURL(upload);
      setUpload(null);
      setFileInputKey(Date.now()); 
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
                      <div className="input-container" style={{display: selectedButton === 'Titles' || selectedButton === 'All' ? " " : "none"}}>
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
                    <div style={{display: selectedButton === 'Metadata' || selectedButton === 'All' ? " " : "none"}}>
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
                            />
            
                            <div className="md-border"></div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div style={{display: selectedButton === 'Metada' || selectedButton === 'All' ? " " : "none"}}>
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
                            />

                            <div className="md-border"></div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <hr className="border-1 my-4 border-accent-20 my-6" />
                    <div className="my-8">
                      <div className="grid grid-cols-3 gap-8" style={{display: selectedButton === 'Metadata' || selectedButton === 'All' ? " " : "none"}}>
                        {menus.map((menu, index) => (
                          <div className="order-none" key={index}>
                            <div className="header-required no-top">
                              Content Rating
                            </div>
                            <div
                              className="md-select focus:outline-none"
                              onClick={() => handleToggleMenu(menu.name)}
                            >
                              <div className="md-select-inner-wrap rounded cursor-pointer block">
                                <div className="flex-grow relative py-[0.3125rem]">
                                  <div className="mb-1 text-xs h-4"></div>

                                  <div
                                    className="placeholder-text opacity-40 with-label font-15"
                                    style={{ minHeight: "1em" }}
                                  >
                                    {selectedOptions[menu.name]
                                      ? selectedOptions[menu.name]
                                      : menu.placeholder}
                                  </div>
                                </div>
                                <IoIosArrowDown className="feather feather-chevron-down icon text-icon-contrast text-undefined chevron ml-1 flex-shrink-0 my-4" />
                              </div>
                              {openMenu && openMenu[menu.name] && (
                                <div
                                  className="overflow-x-hidden overscroll-contain z-10 bg-accent shadow rounded-b absolute z-[3]"
                                  style={{
                                    width: "100%",
                                    display: openMenu[menu.name] ? "" : "none",
                                  }}
                                >
                                  {menu.options.map((option, index) => (
                                    <div
                                      className="px-4 py-2 hover:bg-accent-10 active:bg-accent-10 cursor-pointer font-15"
                                      key={index}
                                      onClick={() =>
                                        handleSelectOption(menu.name, option)
                                      }
                                    >
                                      {option}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    
                        <div className="order-none">
                          <div className="header no-top">Publication Year</div>
                          <div className="md-select focus:outline-none">
                            <div className="md-input">
                              <div className="md-inputwrap">
                                <input
                                  type="number"
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
                      <div style={{display: selectedButton === 'Tags' || selectedButton === 'All' ? " " : "none"}}>
                        <div className="header">Format</div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2">
                            <span className="chip flex items-center">
                              4-Koma
                            </span>
                            <span className="chip flex items-center">
                              Adaption
                            </span>
                            <span className="chip flex items-center">
                              Anthology
                            </span>
                            <span className="chip flex items-center">
                              Award Winning
                            </span>
                            <span className="chip flex items-center">
                              Doujinshi
                            </span>
                            <span className="chip flex items-center">
                              Fan Colored
                            </span>
                            <span className="chip flex items-center">
                              Full Color
                            </span>
                            <span className="chip flex items-center">
                              Long Strip
                            </span>
                            <span className="chip flex items-center">
                              Offical Colored
                            </span>
                            <span className="chip flex items-center">
                              Oneshot
                            </span>
                            <span className="chip flex items-center">
                              Self-Published
                            </span>
                            <span className="chip flex items-center">
                              Web Comic
                            </span>
                          </div>
                        </div>
                        <div className="header">Genre</div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2">
                            <span className="chip flex items-center">
                              Action
                            </span>
                            <span className="chip flex items-center">
                              Adventure
                            </span>
                            <span className="chip flex items-center">
                              Boy's Love
                            </span>
                            <span className="chip flex items-center">
                              Comedy
                            </span>
                            <span className="chip flex items-center">
                              Crime
                            </span>
                            <span className="chip flex items-center">
                              Drama
                            </span>
                            <span className="chip flex items-center">
                              Fantasy
                            </span>
                            <span className="chip flex items-center">
                              Girl's Love
                            </span>
                            <span className="chip flex items-center">
                              History
                            </span>
                            <span className="chip flex items-center">
                              Horror
                            </span>
                            <span className="chip flex items-center">
                              Isekai
                            </span>
                            <span className="chip flex items-center">
                              Magical Girls
                            </span>
                            <span className="chip flex items-center">
                              Mecha
                            </span>
                            <span className="chip flex items-center">
                              Medical
                            </span>
                            <span className="chip flex items-center">
                              Mystery
                            </span>
                            <span className="chip flex items-center">
                              Philosophical
                            </span>
                            <span className="chip flex items-center">
                              Psychological
                            </span>
                            <span className="chip flex items-center">
                              Romance
                            </span>
                            <span className="chip flex items-center">
                              Sci-fi
                            </span>
                            <span className="chip flex items-center">
                              Slice of Life
                            </span>
                            <span className="chip flex items-center">
                              Sports{" "}
                            </span>
                            <span className="chip flex items-center">
                              Superhero
                            </span>
                            <span className="chip flex items-center">
                              Thriller
                            </span>
                            <span className="chip flex items-center">
                              Tragedy
                            </span>
                            <span className="chip flex items-center">
                              Wuxia
                            </span>
                          </div>
                        </div>
                        <div className="header">Theme</div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2">
                            <span className="chip flex items-center">
                              Aliens
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="border-1 my-4 border-accent-20 my-6" />
                    <div style={{display: selectedButton === 'Covers' || selectedButton === 'All' ? " " : "none"}}> 
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
            <div className="page" style={{ backgroundImage: `url(${upload})`, backgroundSize: 'cover' }}>
              <button className="close" onClick={handleResetUpload}>
                <RxCross2 className="icon small text-white" />
              </button>
            </div>
          ) : (
            <label htmlFor="file" className="page placeholder">
              <i className="icon text-icon-contrast text-undefined plus"></i>
              <div className="text-center font-15">Click or drag to add files</div>
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
                      >
                        <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                          Save
                        </span>
                      </button>
                    </div>
                    <hr className="border-1 my-4 border-accent-20 my-6" />
                    <div className="bg-background rounded" id="draft-guideline" ref={guidelineRef}>
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
