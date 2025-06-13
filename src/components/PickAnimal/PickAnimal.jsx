import React, { useState } from "react";
import styles from "./PickAnimal.module.css";
import LeftProfile from "../LeftProfile/LeftProfile";
import { useTranslation } from "react-i18next";
import dog from "../../assets/images/home/categoriesİtem/dog.png";
import cat from "../../assets/images/home/categoriesİtem/cat.png";
import bird from "../../assets/images/home/categoriesİtem/bird.png";
import rabbit from "../../assets/images/home/categoriesİtem/rabbit.png";
import { SaveMemory } from "../../shared/Buttons/Buttons";
import { Link } from "react-router-dom";

const PickAnimal = () => {
  const { t, i18n } = useTranslation();
  const [selectedAnimal, setSelectedAnimal] = useState("");

  const handleSelectAnimal = (animal) => {
    setSelectedAnimal(animal);
  };

  console.log(selectedAnimal);

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
            <Link to="/infopet" style={{ textDecoration: "none", color: "1d2123" }}>
              <SaveMemory disabled={!selectedAnimal || selectedAnimal === ""} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickAnimal;
