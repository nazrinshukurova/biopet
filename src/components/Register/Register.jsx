import React, { useState } from "react";
import styles from "./Register.module.css";
import { useTranslation } from "react-i18next";
import { Facebook, Google } from "../../assets/Svg";
import { supabase } from "../../../client";
import Footer from "../../shared/Footer/Footer";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const { t } = useTranslation();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setsurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const phoneRegex = /^(50|51|55|70|77|99|10|60|90)\s?\d{3}\s?\d{2}\s?\d{2}$/;
    const nameRegex = /^[A-Za-zА-Яа-яЁёƏəÖöÜüĞğÇçŞşİı]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const newErrors = {};

    if (!phoneRegex.test(phone)) {
      newErrors.phone = t("invalid_phone");
    }
    if (!nameRegex.test(name)) {
      newErrors.name = t("invalid_name");
    }
    if (!nameRegex.test(surname)) {
      newErrors.surname = t("invalid_surname");
    }
    if (!emailRegex.test(email)) {
      newErrors.email = t("invalid_email");
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = t("invalid_password");
    }
    if (!termsAccepted) {
      newErrors.terms = t("please_accept_terms");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    const { data, error } = await supabase
      .from("Users")
      .insert([
        { phone, name, surname, email, password, terms: termsAccepted },
      ]);

    if (error) {
      console.error(error);
      setErrors({ general: t("register_error") });
    } else {
      alert(t("register_success"));
      setPhone("");
      setName("");
      setsurname("");
      setEmail("");
      setPassword("");
      setTermsAccepted(false);
      setErrors({});
    }
  };

  return (
    <>
      <div className={styles.full_container}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t("register")}</h1>
          <div className={styles.subtitle_container}>
            <p className={styles.subtitle}>"{t("subtitle")}"</p>
          </div>

          <div className={styles.phone_container}>
            <label className={styles.phone_label}>{t("phone")}</label>
            <div className={styles.phoneInput}>
              <span className={styles.phone_prefix}>+994 </span>
              <input
                type="text"
                placeholder="00 000 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>

          <div className={styles.phone_container}>
            <label className={styles.phone_label}>{t("name")}</label>
            <div className={styles.phoneInput}>
              <input
                type="text"
                placeholder={t("name_placeholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.phone_container}>
            <label className={styles.phone_label}>{t("surname")}</label>
            <div className={styles.phoneInput}>
              <input
                type="text"
                placeholder={t("surname_placeholder")}
                value={surname}
                onChange={(e) => setsurname(e.target.value)}
              />
            </div>
            {errors.surname && <p className={styles.error}>{errors.surname}</p>}
          </div>

          <div className={styles.phone_container}>
            <label className={styles.phone_label}>{t("email")}</label>
            <div className={styles.phoneInput}>
              <input
                type="text"
                placeholder={t("email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.phone_container}>
            <label className={styles.phone_label}>{t("password")}</label>
            <div className={styles.phoneInput}>
              <input
                type="password"
                placeholder={t("password_placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <div className={styles.checkbox}>
            <input
              className={styles.checkbox_container}
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label className={styles.terms} htmlFor="terms">
              {t("terms")}
            </label>
          </div>
          {errors.terms && <p className={styles.error}>{errors.terms}</p>}

          {errors.general && <p className={styles.error}>{errors.general}</p>}

          <button className={styles.registerButton} onClick={handleRegister}>
            {t("register_button")}
          </button>

          <p className={styles.or}>{t("other_methods")}</p>
          <div className={styles.socials}>
            <button className={styles.google}>
              <Google />
            </button>
            <button className={styles.facebook}>
              <Facebook />
            </button>
          </div>

          <p className={styles.footer}>
            {t("already_registered")} <Link to="/login">{t("login")}</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
