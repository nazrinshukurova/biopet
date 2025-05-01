import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/svg/biopet_blue_logo.svg";
import phone from "../../assets/svg/876-black.svg";

const Navbar = () => {
  return (
    <div>
      <nav className={styles.nav_container}>
        <img width="82" height="56" src={logo}></img>
        <img width="76" height="28" src={phone}></img>
        <div className={styles.search_container}>
          <input
            autocomplete="off"
            id="search-auto"
            value=""
            name="q"
            type="text"
            placeholder="Axtar. məs: Royal Canin, Sanicat, qurd dərmanı..."
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
