import React, { useState } from "react";
import styles from "./NavbarMobile.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/svg/biopet_blue_logo.svg";
import search from "../../assets/svg/search.svg";
import { useTranslation } from "react-i18next";
import Dropdown from "../Dropdown/Dropdown";

const NavbarMobile = () => {
  const { t } = useTranslation();
  const [visibility, setVisibility] = useState(false);

  const toggleDropdownMenu = () => {
    setVisibility(true); 
  };

  return (
    <>
      <div className={styles.navbar_mobile_container}>
        <GiHamburgerMenu
          className={styles.burger_menu}
          onClick={toggleDropdownMenu}
        />
        <div className={styles.logo_container}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>
        <div className={styles.search_container}>
          <input
            className={styles.search_input}
            type="text"
            placeholder={t("navbar.searchPlaceholder")}
          />
          <span>
            <img width="16" height="16" src={search} alt="search icon" />
          </span>
        </div>
      </div>

      <Dropdown visibility={visibility} setVisibility={setVisibility} />
    </>
  );
};

export default NavbarMobile;
