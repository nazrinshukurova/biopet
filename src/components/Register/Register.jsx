import React, { useState } from "react";
import styles from "./Register.module.css";
import { useTranslation } from "react-i18next";
import Footer from "../../shared/Footer/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Telefon nömrəsini formatlayan funksiya
const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, ""); // rəqəmlərdən başqa hər şeyi sil
  const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);

  if (match) {
    let formatted = "";
    if (match[1]) formatted += match[1];
    if (match[2]) formatted += " " + match[2];
    if (match[3]) formatted += " " + match[3];
    if (match[4]) formatted += " " + match[4];
    return formatted.trim();
  }
  return value;
};

const RegisterForm = () => {
  const { t } = useTranslation();
  const { register, authErrors } = useAuth();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const phoneRegex = /^\d{2} \d{3} \d{2} \d{2}$/;
    if (!phoneRegex.test(phone)) {
      toast.error(
        "Telefon nömrəsini düzgün formatda daxil edin. Məsələn: 50 555 12 34"
      );
      return;
    }

    setLoading(true);
    const success = await register({
      phone,
      name,
      surname,
      email,
      password,
      terms: termsAccepted,
    });
    setLoading(false);

    if (success) {
      toast.success(t("register_success"));
      setPhone("");
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setTermsAccepted(false);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      toast.error(t("register_failed") || "Qeydiyyat uğursuz oldu");
    }
  };

  return (
    <div className={styles.full_container}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className={styles.container}>
        <div className={styles.form_container}>
          <h1 className={styles.title}>{t("register")}</h1>
          <div className={styles.subtitle_container}>
            <p className={styles.subtitle}>"{t("subtitle")}"</p>
          </div>

          {/* Telefon */}
          <div className={styles.phone_container}>
            <label className={styles.phone_label}>{t("phone")}</label>
            <div className={styles.phoneInput}>
              <span className={styles.phone_prefix}>+994 </span>
              <input
                type="text"
                placeholder="50 555 12 34"
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                disabled={loading}
              />
            </div>
            {authErrors?.phone && (
              <p className={styles.error}>{authErrors.phone}</p>
            )}
          </div>

          {/* Ad */}
          <div className={styles.phone_container}>
            <label className={styles.phone_label}>{t("name")}</label>
            <div className={styles.phoneInput}>
              <input
                type="text"
                placeholder={t("name_placeholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            {authErrors?.name && (
              <p className={styles.error}>{authErrors.name}</p>
            )}
          </div>

          {/* Soyad */}
          <div className={styles.phone_container}>
            <label className={styles.phone_label}>{t("surname")}</label>
            <div className={styles.phoneInput}>
              <input
                type="text"
                placeholder={t("surname_placeholder")}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                disabled={loading}
              />
            </div>
            {authErrors?.surname && (
              <p className={styles.error}>{authErrors.surname}</p>
            )}
          </div>

          {/* Email */}
          <div className={styles.phone_container}>
            <label className={styles.phone_label}>{t("email")}</label>
            <div className={styles.phoneInput}>
              <input
                type="email"
                placeholder={t("email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            {authErrors?.email && (
              <p className={styles.error}>{authErrors.email}</p>
            )}
          </div>

          <div className={styles.phone_container}>
            <label className={styles.phone_label}>{t("password")}</label>
            <div className={styles.phoneInput}>
              <input
                type="password"
                placeholder={t("password_placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {authErrors?.password && (
              <p className={styles.error}>{authErrors.password}</p>
            )}
          </div>

          <div className={styles.checkbox}>
            <input
              className={styles.checkbox_container}
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              disabled={loading}
            />
            <label className={styles.terms} htmlFor="terms">
              {t("terms")}
            </label>
          </div>

          {authErrors?.terms && (
            <p className={styles.error}>{authErrors.terms}</p>
          )}
          {authErrors?.general && (
            <p className={styles.error}>{authErrors.general}</p>
          )}

          <button
            className={styles.registerButton}
            onClick={handleRegister}
            disabled={loading || !termsAccepted}
            style={{
              backgroundColor: loading || !termsAccepted ? "#ccc" : "#00bfa6",
              cursor: loading || !termsAccepted ? "not-allowed" : "pointer",
            }}
          >
            {loading ? <div className="spinner2"></div> : t("register_button")}
          </button>

          <p className={styles.footer}>
            {t("already_registered")} <Link to="/login">{t("login")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
