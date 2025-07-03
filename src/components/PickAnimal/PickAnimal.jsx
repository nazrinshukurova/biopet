import React, { useState, useEffect } from "react";
import styles from "./PickAnimal.module.css";
import LeftProfile from "../LeftProfile/LeftProfile";
import { useTranslation } from "react-i18next";
import dog from "../../../public/categoriesİtem/dog.png";
import cat from "../../../public/categoriesİtem/cat.png";
import bird from "../../../public/categoriesİtem/bird.png";
import rabbit from "../../../public/categoriesİtem/rabbit.png";
import { SaveMemory } from "../../shared/Buttons/Buttons";
import { Link } from "react-router-dom";

const PickAnimal = () => {
  const { t, i18n } = useTranslation();

  // localStorage-dan başlanğıc dəyəri oxu
  const [selectedAnimal, setSelectedAnimal] = useState(() => {
    return localStorage.getItem("selectedAnimal") || "";
  });

  const handleSelectAnimal = (animal) => {
    setSelectedAnimal(animal);
    localStorage.setItem("selectedAnimal", animal);
  };

  // Əgər selectedAnimal boşalarsa, localStorage-dan sil
  useEffect(() => {
    if (!selectedAnimal) {
      localStorage.removeItem("selectedAnimal");
    }
  }, [selectedAnimal]);

  // Məsələn logout funksiyası burada olmaya bilər,
  // amma logout zamanı bu çağırılsın:
  const logout = () => {
    localStorage.removeItem("selectedAnimal");
    // digər logout əməliyyatları, məsələn redirect və s.
    console.log("User logged out, selectedAnimal cleared from localStorage");
  };

  return (
    <div>
      <div className={styles.profile}>
        <div className={styles.profile_menu_container}>
          <LeftProfile />
        </div>
        <div className={styles.profile_body}>
          <div className={styles.title}>
            {i18n.language === "az"
              ? "Ev heyvanının növünü seçin"
              : "Выберите тип питомца"}
          </div>
          <div className={styles.animals}>
            <div
              className={`${styles.img_container} ${
                selectedAnimal === "dog" ? styles.selected : ""
              }`}
              onClick={() => handleSelectAnimal("dog")}
            >
              <img className={styles.img} src={dog} alt="dog" />
            </div>
            <div
              className={`${styles.img_container} ${
                selectedAnimal === "cat" ? styles.selected : ""
              }`}
              onClick={() => handleSelectAnimal("cat")}
            >
              <img className={styles.img} src={cat} alt="cat" />
            </div>
            <div
              className={`${styles.img_container} ${
                selectedAnimal === "rabbit" ? styles.selected : ""
              }`}
              onClick={() => handleSelectAnimal("rabbit")}
            >
              <img className={styles.img} src={rabbit} alt="rabbit" />
            </div>
            <div
              className={`${styles.img_container} ${
                selectedAnimal === "bird" ? styles.selected : ""
              }`}
              onClick={() => handleSelectAnimal("bird")}
            >
              <img className={styles.img} src={bird} alt="bird" />
            </div>
          </div>
          <div>
            <Link
              to="/infopet"
              style={{ textDecoration: "none", color: "#1d2123" }}
            >
              <SaveMemory disabled={!selectedAnimal} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickAnimal;
