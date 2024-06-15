import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import Navbarheader from "../Homepage/Navbarheader";
import { IoMdArrowBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";

export default function ChapterUpload() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [chapterNumber, setChapterNumber] = useState("");
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1050/api/v1/title/${id}`
        );
        setManga(response.data.data);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchMangaData();
  }, [id]);

  //img preview and upload
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const fileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const previewsArray = selectedFiles.map((file) =>
      URL.createObjectURL(file)
        
    );
    
    setPreviews([...previews, ...previewsArray]);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    if (index >= 0 && index < previews.length && index < files.length) {
      const newPreviews = [...previews];
      newPreviews.splice(index, 1);
      setPreviews(newPreviews);
  
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
    }
    
  };
  const navigate = useNavigate()
    const postNewChapter = async () => {
        const formData = new FormData();
        formData.append("title", title)
        formData.append("chapterNumber", chapterNumber)
        files.forEach((file, index) => {
            formData.append(`file`, file);
        });
    
    try {
        const response = await axios.post (
             `http://localhost:1050/api/v1/chapter/upload/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              'authorization': `Bearer ${token}`
            },
          }
        );
        console.log(response.data)
        alert('Chapter uploaded successful')
        navigate(`/title/${id}`)
    } catch (error) {
        console.log("error uploading manga", error)
    }
    }
  return (
    <div className="flex flex-grow text-color">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <Navbarheader />
        <div className="md-content flex-grow bg-dark">
          <div className="page-container">
            <div className="flex items-center mb-6 mt-2">
              <button
                className="mr-4 mb-1 text-2xl cursor-pointer rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text rounded-full !px-0 mr-4 mb-1 text-2xl cursor-pointer"
                style={{ minHeight: "2.5rem", minWidht: "2.5rem" }}
              >
                <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                  <IoMdArrowBack className="feather feather-arrow-left icon" />
                </span>
              </button>
              <h2 className="font-header text-2xl font-semibold">
                Upload Chapter
              </h2>
            </div>
            <h4 className="mb-2 font-bold font-15">Title</h4>
            <div className="grid grid-cols-6 gap-2">
              <div className="col-span-6">
                {manga && (
                  <div className="manga-card dense overview">
                    <span
                      className="font-bold title"
                      style={{ gridArea: "title" }}
                    >
                      {manga.title}
                    </span>
                    <span
                      className="author "
                      style={{ gridArea: "author", paddingLeft: "0.5rem" }}
                    >
                      <NavLink to={"/"} className="author uppercase">
                        {manga.author.name}
                      </NavLink>
                      {manga.artist ? (
                        <NavLink to={"/"} className="author uppercase">
                          , {manga.artist.name}
                        </NavLink>
                      ) : (
                        ""
                      )}
                    </span>
                    <div
                      className="manga-card-cover"
                      style={{ gridArea: "art" }}
                    >
                      <div className="group flex items-start relative mb-auto select-none aspect cover">
                        <img
                          src={manga.images}
                          alt="Manga cover"
                          className="rounded shadow-md w-full h-auto"
                        />
                      </div>
                    </div>
                    <div
                      className="flex flex-wrap status mb-auto"
                      style={{ gridArea: "status", paddingLeft: "0.5rem" }}
                    >
                      <span
                        className="tag lift dot"
                        style={{ fontSize: "0.75rem", color: "#fff" }}
                      >
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
                        <span>{manga.status}</span>
                      </span>
                    </div>
                  </div>
                )}
                <hr className="border-1 my-4 border-accent-20 col-span-6" />
                <div className="col-span-6 mb-6">
                  <div className="md-input">
                    <div className="md-inputwrap">
                      <input
                        type="number"
                        placeholder="Chapter Number"
                        name="chapterNum"
                        value={chapterNumber}
                        onChange={(e) => setChapterNumber(e.target.value)}
                        className="text-color"
                      />
                      <div className="mr-border"></div>
                    </div>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="md-input">
                    <div className="md-inputwrap">
                      <input
                        type="text"
                        placeholder="Chapter Name"
                        className="text-color"
                        name="chapterNum"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-1 my-4 border-accent-20 my-6" />
            <h4 className="my-4 font-medium">Pages</h4>
            <div>
              <div>
                <div className="flex justify-left flex-wrap gap-2">
                  <div className="flex flex-grow-0 p-3">
                  {previews &&
                      previews.length > 0 &&
                      previews.map((previewURL, index) => (
                        <div key={index} className="flex-grow-0 p-3">
                          <div
                            className="page-multi"
                            style={{
                              backgroundImage: `url(${previewURL})`,
                              backgroundSize: "cover",
                            }}
                          >
                            <div className="close-page-multi" onClick={() => removeFile(index)}>
                                <div className="icon-container">
                                    <RxCross2 className="icon small text-white" />
                                </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    <label
                      htmlFor="add-file"
                      className="page-multi placeholder"
                    >
                      <FaPlus className="icon small text-white" />
                    </label>
                    
                  </div>
                </div>
                <input
                  type="file"
                  id="add-file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  style={{ display: "none" }}
                  onChange={fileUpload}
                />
              </div>
            </div>
            <hr className="border-1 my-4 border-accent-20 my-6" />

            <div className="flex my-6 items-center justify-end flex-col-reverse md-flex-row ">
              <button
                className="md:mr-8 mt-4 md:my-0 rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent text md:mr-8 mt-4 md:my-0"
                style={{
                  minHeight: "3rem",
                  minWidth: "13.75rem",
                  marginRight: "10px",
                }}
              >
                <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                  Cancel
                </span>
              </button>
              <button
                className="rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden primary  glow"
                style={{ minHeight: "3rem", minWidth: "13.75rem" }}
                onClick={postNewChapter}
             >
                <span className="flex relative items-center justify-center font-medium select-none w-full pointer-events-none">
                  Confirm
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
