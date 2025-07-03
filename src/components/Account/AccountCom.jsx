import React, { useState, useEffect } from "react";
import styles from "./Account.module.css";
import { useTranslation } from "react-i18next";
import { FinishTheOrder } from "../../shared/Buttons/Buttons";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../client";
import LeftProfile from "../LeftProfile/LeftProfile";

const AccountCom = () => {
  const { t, i18n } = useTranslation();
  const { user, logout, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async () => {
    if (isEditing) {
      const { data, error } = await supabase
        .from("Users")
        .update({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: formData.phone,
        })
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating user:", error);
      } else {
        console.log("User updated successfully.");

        // Yeni istifadəçi məlumatını kontekstdə və localStorage-da yenilə
        updateUser(data);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--container-bg)",
      }}
      className={styles.profile_container}
    >
      <div className={styles.profile_menu_container}>
        <LeftProfile />
      </div>
      <div className={styles.profile_body_container}>
        <div className={styles.title}>
          {i18n.language === "az"
            ? "Şəxsi məlumatlar"
            : "Персональная информация"}
        </div>
        <div className={styles.profile_body}>
          <div className={styles.form_container}>
            <div className={styles.input_and_label}>
              <label>{t("name")}</label>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className={styles.input_and_label}>
              <label>{t("surname")}</label>
              <input
                className={styles.input}
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className={styles.input_and_label}>
              <label>{t("email")}</label>
              <input
                className={styles.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className={styles.input_and_label}>
              <label>{t("phone")}</label>
              <input
                className={styles.input}
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className={styles.button} onClick={handleEdit}>
            <FinishTheOrder text={isEditing ? t("save") : t("edit")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCom;
