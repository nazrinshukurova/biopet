import React from "react";
import styles from "./AddPet.module.css";
import LeftProfile from "../LeftProfile/LeftProfile";
import { Plus } from "../../assets/Svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AddPet = () => {
  const { t, i18n } = useTranslation();

  return (
    <div  className={styles.profile}>
      <div className={styles.profile_menu_container}>
        <LeftProfile />
      </div>
      <div className={styles.profile_body}>
        <Link
          style={{ textDecoration: "none", color: "#1d2123" }}
          to="/pickanimal"
        >
          {" "}
          <div className={styles.plus_and_title}>
            {" "}
            <div className={styles.plus}>
              <Plus />
            </div>
            <div>
              {i18n.language === "az"
                ? "Yeni ev heyvanı əlavə et"
                : "Добавить нового питомца"}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AddPet;
