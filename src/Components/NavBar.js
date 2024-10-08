import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu'; // Material UI Menu Icon
import CloseIcon from '@mui/icons-material/Close'; // Material UI Close Icon

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to control menu visibility

  const onHomeTextClick = useCallback(() => {
    navigate("/");
    setIsOpen(false); // Close menu on navigation
  }, [navigate]);

  const onTeamTextClick = useCallback(() => {
    navigate("/Team");
    setIsOpen(false);
  }, [navigate]);

  const onAboutTextClick = useCallback(() => {
    navigate("/About");
    setIsOpen(false);
  }, [navigate]);

  const onEventsTextClick = useCallback(() => {
    navigate("/Events");
    setIsOpen(false);
  }, []);

  const onContactTextClick = useCallback(() => {
    navigate("/Contactus");
    setIsOpen(false);
  }, [navigate]);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close state
  };

  return (
    <nav
      style={{ zIndex: 2 }}
      className="font-source-sans-pro text-center text-[0.7rem] lg:text-[1.7rem] text-black absolute top-0 bg-gray w-full overflow-hidden p-2 lg:p-[2rem] flex justify-between items-center"
    >
      {/* Hamburger Icon on the left */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-black focus:outline-none p-2"
        >
          {isOpen ? (
            <CloseIcon className="w-6 h-6" /> // Close Icon when menu is open
          ) : (
            <MenuIcon className="w-6 h-6" /> // Hamburger Icon when menu is closed
          )}
        </button>
      </div>

      {/* Hide the logo on mobile and show it on large screens */}
      <img
        className="hidden lg:block w-20 h-auto lg:w-[11.69rem] lg:h-[6.75rem]"
        alt="Logo"
        src="/logo-3-1@2x.png"
      />

      {/* Large screen menu */}
      <div className="hidden lg:flex lg:space-x-[1.5rem]">
        <span onClick={onHomeTextClick} className="cursor-pointer">
          Home
        </span>
        <span onClick={onAboutTextClick} className="cursor-pointer">
          About
        </span>
        <span onClick={onTeamTextClick} className="cursor-pointer">
          Teams
        </span>
        <span onClick={onEventsTextClick} className="cursor-pointer">
          Events
        </span>
        <span onClick={onContactTextClick} className="cursor-pointer">
          Contact
        </span>
      </div>

      {/* Sliding Menu for mobile */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-2/5 z-50 p-5 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-2 right-2 text-black"
        >
          <CloseIcon className="w-6 h-6" /> {/* Close Icon inside sliding menu */}
        </button>

        {/* Logo inside the sliding menu */}
        <div className="mb-6">
          <img
            className="w-35 h-30 mx-auto"
            alt="Logo"
            src="/logo-3-1@2x.png"
          />
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <span onClick={onHomeTextClick} className="cursor-pointer block">
            Home
          </span>
          <span onClick={onAboutTextClick} className="cursor-pointer block">
            About
          </span>
          <span onClick={onTeamTextClick} className="cursor-pointer block">
            Teams
          </span>
          <span onClick={onEventsTextClick} className="cursor-pointer block">
            Events
          </span>
          <span onClick={onContactTextClick} className="cursor-pointer block">
            Contact
          </span>
        </div>
      </div>

      <img
        className="hidden lg:block flex-shrink-0 w-20 h-auto lg:w-[11.75rem] lg:h-[6.31rem]"
        alt="Another Image"
        src="/image-7@2x.png"
      />
    </nav>
  );
};

export default NavBar;
