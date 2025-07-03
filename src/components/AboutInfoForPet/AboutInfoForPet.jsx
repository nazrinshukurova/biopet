import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./AboutInfoForPet.module.css";
import LeftProfile from "../LeftProfile/LeftProfile";
import { useTranslation } from "react-i18next";
import { BigPaw, Camera } from "../../assets/icons/Svg.jsx";
import Radio from "@mui/material/Radio";
import { ClearAll, SaveMemory } from "../../shared/Buttons/Buttons";
import PetInfoContext from "../../context/PetInfoContext"; // Yolunu özünə görə düzəlt

const AboutInfoForPet = () => {
  const { t, i18n } = useTranslation();
  const { petInfo, setPetInfo } = useContext(PetInfoContext);

  const [selectedGender, setSelectedGender] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [petName, setPetName] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("petInfo"));
    if (savedData) {
      setPetName(savedData.name || "");
      setSelectedGender(savedData.gender || "");
      setBackgroundImage(savedData.image || null);
      setPetInfo(savedData);
    }
  }, [setPetInfo]);

  const handleChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    const updatedPetInfo = {
      name: petName,
      gender: selectedGender,
      image: backgroundImage,
    };
    setPetInfo(updatedPetInfo);
    localStorage.setItem("petInfo", JSON.stringify(updatedPetInfo));
    alert(
      i18n.language === "az"
        ? "Məlumatlar yadda saxlanıldı"
        : "Данные сохранены"
    );
  };

  const handleReset = () => {
    setPetName("");
    setSelectedGender("");
    setBackgroundImage(null);
    setPetInfo(null);
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
              ? "Ev heyvanınız haqqında ətraflı məlumat daxil edin"
              : "Введите подробную информацию о вашем питомце."}
          </div>
          <div
            className={styles.paw_box}
            style={{
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              overflow: "hidden",
            }}
          >
            <div className={styles.paw_and_bg}>
              {!backgroundImage && <BigPaw />}
            </div>
            <div className={styles.camera} onClick={handleCameraClick}>
              <Camera />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div className={styles.groups}>
            <div className={styles.label_input}>
              <label>{t("name")}</label>
              <input
                placeholder={t("name_placeholder")}
                className={styles.name_input}
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </div>
            <div className={styles.label_input}>
              <label>{t("gender")}</label>
              <div className={styles.radio_groups}>
                <div>
                  <Radio
                    checked={selectedGender === "male"}
                    onChange={handleChange}
                    value="male"
                    name="radio-buttons"
                  />
                  {t("male")}
                </div>
                <div>
                  <Radio
                    checked={selectedGender === "female"}
                    onChange={handleChange}
                    value="female"
                    name="radio-buttons"
                  />
                  {t("female")}
                </div>
              </div>
            </div>
            <SaveMemory onClick={handleSave} />
            <ClearAll clickFunction={handleReset} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutInfoForPet;
