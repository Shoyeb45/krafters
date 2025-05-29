import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import NavBar from "./components/NavBar";
// import Quizzes from "./pages/Quizzes"
import { BrowserRouter } from "react-router-dom";
import Video from "./pages/Video";
import Notes from "./pages/Notes";
import Auth from "./components/Auth/Auth.jsx";
import { useContext } from "react";
import { DocumentContext } from "./context/Provider.jsx";
import TestInstructions from "./pages/TestInstructions";
import TestSequence from "./pages/TestSequence";
import { useLocation } from "react-router-dom";
import Dashboard from "./components/UserDashboard.jsx";
import Lectures from "./pages/Lectures.jsx";

const App = () => {
  const { isAuthVisible, setIsAuthVisible } = useContext(DocumentContext);
  const location = useLocation();
  const hideNavbarPaths = ["/TestSequence",'/TestInstructions', '/batch/videos', '/batch/notes','/dashboard', '/batch/quizzes'];
  return (
    <>
      <ToastContainer />
      <div className="bg-pwpurple/20">
        {isAuthVisible && (<Auth
          isAuthVisible={isAuthVisible}
          setIsAuthVisible={setIsAuthVisible}
        />)}
        {!hideNavbarPaths.includes(location.pathname) && <NavBar />}
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/batch/:id" element={<Lectures />} />
            {/* <Route path="/disable/quizzes" element={<Quizzes />} /> */}
            <Route path="/testInstructions" element={<TestInstructions />} />
            <Route path="/testSequence" element={<TestSequence />} />

            <Route path="/batch/video" element={<Video />} />
            <Route path="/batch/notes" element={<Notes />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;