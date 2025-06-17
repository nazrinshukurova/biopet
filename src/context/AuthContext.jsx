import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [authErrors, setAuthErrors] = useState({});
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("isLogin") === "true";
  });

  const register = async ({ phone, name, surname, email, password, terms }) => {
    const phoneRegex = /^(50|51|55|70|77|99|10|60|90)\s?\d{3}\s?\d{2}\s?\d{2}$/;
    const nameRegex = /^[A-Za-zА-Яа-яЁёƏəÖöÜüĞğÇçŞşİı]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const newErrors = {};

    if (!phoneRegex.test(phone)) newErrors.phone = t("invalid_phone");
    if (!nameRegex.test(name)) newErrors.name = t("invalid_name");
    if (!nameRegex.test(surname)) newErrors.surname = t("invalid_surname");
    if (!emailRegex.test(email)) newErrors.email = t("invalid_email");
    if (!passwordRegex.test(password))
      newErrors.password = t("invalid_password");
    if (!terms) newErrors.terms = t("please_accept_terms");

    if (Object.keys(newErrors).length > 0) {
      setAuthErrors(newErrors);
      return false;
    }

    const { error } = await supabase
      .from("Users")
      .insert([{ phone, name, surname, email, password, terms }]);

    if (error) {
      setAuthErrors({ general: t("register_error") });
      return false;
    }

    setAuthErrors({});
    return true;
  };

  const login = async ({ email, password, terms }) => {
    if (!terms) {
      setAuthErrors({ terms: t("terms_alert") });
      return false;
    }

    if (!email || !password) {
      setAuthErrors({ general: t("fill_fields_alert") });
      return false;
    }

    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      setAuthErrors({ general: t("user_not_found") });
      return false;
    }

    setUser(data);
    setIsLogin(true);

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("isLogin", "true");

    setAuthErrors({});
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLogin");
    window.location.href="/"
  };

  return (
    <AuthContext.Provider
      value={{ user, authErrors, isLogin, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
