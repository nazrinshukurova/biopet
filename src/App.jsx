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
import FAQ from "./pages/FAQ";
import RegisterForm from "./components/Register/Register";
import Blogs from "./pages/Blogs";
import BlogsDetails from "./pages/BlogsDetails";
import Login from "./components/Login/Login";
import Registration from "./pages/Registration";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { BasketProvider } from "./context/AddToBasket";
import Basket from "./pages/Basket";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

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
        <AuthProvider>
          <WishlistProvider>
            <BasketProvider>
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
                <Route path="/faq" element={<FAQ />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogsDetails />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/wishlist" element={<Wishlist />} />
                 <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {/* <Footer/> */}
            </BasketProvider>
          </WishlistProvider>
        </AuthProvider>
      </BrowserRouter>
    </ProductProvider>
  );
};

export default App;
