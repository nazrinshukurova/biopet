import React from "react";
import styles from "./LeftProfile.module.css";
import { AccountHeart, AccountLocation, Ball, Logout } from "../../assets/Svg";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const LeftProfile = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <div>
      <div className={styles.profile_menu}>
        <div className={styles.title}>
          {i18n.language === "az" ? "Profilim" : "Профилим"}
        </div>
        <div className={styles.subcontainer}>
          <div className={styles.list}>
            {" "}
            <AccountHeart />
            <Link
              style={{ textDecoration: "none", color: "#1d2123" }}
              to="/wishlist"
            >
              {" "}
              <div>
                {i18n.language === "az" ? "İstək listim" : "Мой список желаний"}
              </div>
            </Link>
          </div>
          <div className={styles.list}>
            {" "}
            <AccountLocation />
            <Link
              style={{ textDecoration: "none", color: "#1d2123" }}
              to="/checkout"
            >
              {" "}
              <div>{i18n.language === "az" ? "Ünvanlarım" : "Мои адреса"}</div>
            </Link>
          </div>
          <div className={styles.list}>
            {" "}
            <Ball />
            <Link
              style={{ textDecoration: "none", color: "#1d2123" }}
              to="/mypet"
            >
              {" "}
              <div>
                {i18n.language === "az" ? " Ev heyvanlarım" : "Мои питомцы"}
              </div>
            </Link>
          </div>
          <div className={styles.list}>
            {" "}
            <Logout />{" "}
            <div onClick={logout}>
              {i18n.language === "az" ? "Çıxış" : "Выход"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftProfile;
