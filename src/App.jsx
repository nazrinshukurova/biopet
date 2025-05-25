import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./shared/Navbar/Navbar";
import i18next from "i18next";
import Dropdown from "./shared/Dropdown/Dropdown";
import NavbarMobile from "./shared/NavbarMobile/NavbarMobile";
import Products from "./pages/Products";
import Details from "./pages/Details";
import Footer from "./shared/Footer/Footer";
import DiscountedProducts from "./pages/DiscountedProducts";
import { ProductProvider } from "./context/ProductContext";

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
    }; //&clean up function
  }, [savedLang]);

  if (!savedLang) return null;

  console.log(savedLang);

  const language = savedLang;

  return (
    <ProductProvider>
      <BrowserRouter>
        <Navbar lang={language} />
        <Dropdown />
        <NavbarMobile />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Details />} />
          <Route
            path="/products/discounted_products"
            element={<DiscountedProducts />}
          />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </ProductProvider>
  );
};

export default App;
