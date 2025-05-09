import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./shared/Navbar/Navbar";
import i18next from "i18next";
import Dropdown from "./shared/Dropdown/Dropdown";
import NavbarMobile from "./shared/NavbarMobile/NavbarMobile";

const App = () => {
  const [savedLang, setSavedLang] = useState(null);

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "az";
    setSavedLang(lang);

    const handleLangChange = (lng) => {
      setSavedLang(lng);
    };

    i18next.on("languageChanged", handleLangChange);

    return () => {
      i18next.off("languageChanged", handleLangChange);
    };
  }, []);

  if (!savedLang) return null;

  return (
    <BrowserRouter>
      <Navbar />
      <Dropdown />
      <NavbarMobile />
      <Routes>
        <Route path={`/${savedLang}`} element={<Home />} />
        <Route path="*" element={<Navigate to={`/${savedLang}`} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
