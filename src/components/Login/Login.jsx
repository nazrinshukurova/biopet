import React, { useState } from "react";
import styles from "./Login.module.css";
import { useTranslation } from "react-i18next";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../../client";

const Login = () => {
  const { t } = useTranslation();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleLogin = async () => {
    if (!termsAccepted) {
      alert(t("terms_alert") || "Please accept the terms");
      return;
    }
    if (!phone || !password) {
      alert(t("fill_fields_alert") || "Please fill all fields");
      return;
    }

    // Telefon nömrəsi +994 olmadan (yalnız nömrə)
    // Supabase sorgusu
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("phone", phone)
      .eq("password", password)
      .single();

    if (error) {
      alert(t("error_occurred") || "An error occurred");
      console.error(error);
      return;
    }

    if (data) {
      alert(t("login_success") || "Login successful");
      setPassword("");
      setPhone("");
    } else {
      alert(t("user_not_found") || "User not found");
    }
  };

  return (
    <div className={styles.full_container}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("login")}</h1>

        <div className={styles.phone_container}>
          <label className={styles.phone_label}>{t("phone")}</label>
          <div className={styles.phoneInput}>
            <span className={styles.phone_prefix}>+994 </span>
            <input
              type="number"
              placeholder="00 000 00 00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.phone_container}>
          <label className={styles.phone_label}>{t("password")}</label>
          <div className={styles.phoneInput}>
            <input
              type="password"
              placeholder={t("password_placeholder") || "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.checkbox}>
          <input
            className={styles.checkbox_container}
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
          <label className={styles.terms} htmlFor="terms">
            {t("terms")}
          </label>
        </div>

        <button className={styles.registerButton} onClick={handleLogin}>
          {t("register_button")}
        </button>
      </div>
    </div>
  );
};

export default Login;
