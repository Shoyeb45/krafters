
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  // Local url 
  // const backendUrl = "http://localhost:4000";
  // const mlBackendUrl = "http://localhost:8000";

  // Productoin urls
  const backendUrl = "https://amanrajgupta.me";
  const mlBackendUrl = "https://amangupta.live";
  const [isOpenUploadBox, setIsOpenUploadBox] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [documentSummary, setDocumentSummary] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

const getCourses = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/course/get-all`);
    const data = await response.json();
    console.log("Courses fetched:", data);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
  }
};


  const logOut = () => {
    localStorage.removeItem("token");
    setToken(""); // Clear token state
    setIsAuthVisible(true); // Show auth modal again
    toast.success("Logged Out Successfully");
  };

  useEffect(() => {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      setToken(tokenData);
    } 
  }, []);

  useEffect(() => {
    if (token) {
      setIsAuthVisible(false);
    }
  }, [token]);

  const value = {
    isOpenUploadBox,
    setIsOpenUploadBox,
    uploadedFiles,
    setUploadedFiles,
    documentSummary,
    setDocumentSummary,
    text,
    setText,
    isAuthVisible,
    token,
    setToken, 
    setIsAuthVisible,
    backendUrl,
    logOut,
    getCourses,
    loading,
    setLoading,
    videoUrl,
    setVideoUrl,
    mlBackendUrl
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};