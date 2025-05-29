import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import animate from "../assets/giphy.webp";
import { DocumentContext } from "../context/Provider";

export default function NavBar() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isAuthVisible, setIsAuthVisible } = React.useContext(DocumentContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNav(false); // scrolling down
      } else {
        setShowNav(true); // scrolling up
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

          {/* Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-12">
              {["/", "/courses", "/about", "/contact"].map((path, i) => (
                <a
                  key={i}
                  href={path}
                  className="text-neutral-900 hover:bg-pwpurple hover:text-white px-3 py-2 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-300/50"
                >
                  {["Home", "Our Courses", "About Us", "Contact"][i]}
                </a>
              ))}
              <a
                href="/TestInstructions"
                className="relative group text-neutral-900 font-medium px-3 py-2 rounded-full animate-bounce hover:bg-pwpurple transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl hover:shadow-purple-400/60 hover:text-white hover:bg-gradient-to-r "
              >
                <img
                  src={animate}
                  alt=""
                  className="absolute -z-10 h-20 w-10 hidden  group-hover:block"
                />
                Test
              </a>
            </div>
          </div>

          {/* Register Button */}
          <div className="flex gap-2 rounded-full border border-neutral-200 px-4 py-2 hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-200/50 group">
            <button className="text-neutral-900 group-hover:text-pwpurple-700 font-medium transition-colors duration-300 ease-in-out"
            onClick={() => setIsAuthVisible(true)}
            >
              Register Now
            </button>
            <div className="w-4 h-4 bg-white rounded-full border border-neutral-200 group-hover:bg-purple-500 group-hover:border-purple-500 transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:animate-pulse"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}