import React from "react";
import "../css/Header.css";
import HomePageImage from "../Images/HomePageImage.png"

const Header = () => {
  return (
    <div>
        <header className="HomePage-Header">
          <h1>
            BA:)HAAIYA
          </h1>
          <button>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </header>
      <section className="HomePage-SearchBar">
        <img src={HomePageImage} alt="Wedding Ceremony" />
        <div className="search-bar">
          <input type="text" placeholder="Search For Anything You Need (Eg. Wedding Venue, Makeup)" />
        </div>
      </section>
    </div> 
    );
};

export default Header;
