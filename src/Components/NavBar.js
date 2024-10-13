import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility

  const onHomeTextClick = () => {
    navigate("/");
    setIsMenuOpen(false); // Close menu on navigation
  };

  const onTeamTextClick = () => {
    navigate("/Team");
    setIsMenuOpen(false);
  };

  const onAboutTextClick = () => {
    navigate("/About");
    setIsMenuOpen(false);
  };

  const onEventsTextClick = () => {
    navigate("/Events");
    setIsMenuOpen(false);
  };

  const onContactTextClick = () => {
    navigate("/Contactus");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="font-source-sans-pro text-center text-[1.7rem] text-black bg-gray w-full flex justify-between items-center">
      <span
        className="block lg:hidden text-[3rem] ml-[16px] mt-[16px] cursor-pointer"
        onClick={toggleMenu}
      >
        {!isMenuOpen ? <GiHamburgerMenu /> : <IoClose />}
      </span>

      <img className="lg:block w-28 h-auto lg:w-48 md:w-36" alt="Logo" src="/logo-3-1@2x.png" />

      {isMenuOpen && (
        <div className="absolute top-[60px] left-0 w-[90%] bg-white shadow-lg z-50 flex flex-col items-center space-y-4 p-6 lg:hidden">
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
      )}

      <div className="hidden lg:flex space-x-4 text-[1.5rem]">
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

      <img className="lg:block w-28 h-auto lg:w-48 md:w-36 mr-[20px]" alt="Another Image" src="/image-7@2x.png" />
    </nav>
  );
};

export default NavBar;
