import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import animate from "../assets/giphy.webp";
import { DocumentContext } from "../context/Provider";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";

export default function NavBar() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthVisible, setIsAuthVisible } = React.useContext(DocumentContext);
  const navigate = useNavigate();

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    setIsMobileMenuOpen(false); // Close menu on navigation
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full z-10 fixed top-0 bg-gradient-to-b from-white to-indigo-100 transition-transform duration-300 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full mx-auto py-2 px-6">
        <div className="w-full flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-blue-600">
              <img src={logo} alt="logo" className="h-32 w-32" />
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-indigo-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-12">
              <a
                href="/"
                className="text-neutral-900 hover:bg-pwpurple hover:text-white px-3 py-2 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-300/50"
              >
                Home
              </a>

              <a
                href="/courses"
                className="text-neutral-900 hover:bg-pwpurple hover:text-white px-3 py-2 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-300/50"
              >
                Our Courses
              </a>

              <a
                href="/about"
                onClick={(e) => handleClick(e, "/about")}
                className="text-neutral-900 hover:bg-pwpurple hover:text-white px-3 py-2 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-300/50"
              >
                About Us
              </a>

              <a
                href="/contact"
                onClick={(e) => handleClick(e, "/contact")}
                className="text-neutral-900 hover:bg-pwpurple hover:text-white px-3 py-2 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-300/50"
              >
                Contact
              </a>

              <a
                href="/TestInstructions"
                className="relative group text-neutral-900 font-medium px-3 py-2 rounded-full animate-bounce hover:bg-pwpurple transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl hover:shadow-purple-400/60 hover:text-white hover:bg-gradient-to-r"
              >
                <img
                  src={animate}
                  alt="Animated Icon"
                  className="absolute -z-10 h-20 w-10 hidden group-hover:block"
                />
                Test
              </a>
            </div>
          </div>

          {/* Register Button */}
          <div className="hidden md:flex gap-2 rounded-full border group border-gray-300 px-4 py-2 hover:bg-gray-100 hover:border-indigo-200 hover:border-3 hover:shadow-2xl transition-colors duration-200">
            <button
              className="font-medium transition-colors duration-200 text-pwpurple hover:text-indigo-700"
              onClick={() => setIsAuthVisible(true)}
            >
              Register Now
            </button>
            <div className="bg-white rounded-full border border-gray-300 p-1">
              <ArrowRight className="w-5 h-5 transition-all text-indigo-950 -rotate-45 group-hover:rotate-50 duration-500 hover:text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 flex flex-col items-start bg-white rounded-xl shadow-lg p-4">
            <a
              href="/"
              className="w-full text-neutral-900 hover:text-white hover:bg-pwpurple px-4 py-2 rounded-full transition"
              onClick={(e) => handleClick(e, "/")}
            >
              Home
            </a>
            <a
              href="/courses"
              className="w-full text-neutral-900 hover:text-white hover:bg-pwpurple px-4 py-2 rounded-full transition"
              onClick={(e) => handleClick(e, "/courses")}
            >
              Our Courses
            </a>
            <a
              href="/about"
              className="w-full text-neutral-900 hover:text-white hover:bg-pwpurple px-4 py-2 rounded-full transition"
              onClick={(e) => handleClick(e, "/about")}
            >
              About Us
            </a>
            <a
              href="/contact"
              className="w-full text-neutral-900 hover:text-white hover:bg-pwpurple px-4 py-2 rounded-full transition"
              onClick={(e) => handleClick(e, "/contact")}
            >
              Contact
            </a>
            <a
              href="/TestInstructions"
              className="w-full text-neutral-900 hover:text-white hover:bg-pwpurple px-4 py-2 rounded-full transition"
            >
              Test
            </a>
            <button
              onClick={() => {
                setIsAuthVisible(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-pwpurple hover:text-white hover:bg-indigo-500 px-4 py-2 rounded-full border border-gray-300 transition"
            >
              Register Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
