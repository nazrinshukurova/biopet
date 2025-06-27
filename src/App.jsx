import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import i18next from "i18next";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Details from "./pages/Details";
import DiscountedProducts from "./pages/DiscountedProducts";
import FAQ from "./pages/FAQ";
import Blogs from "./pages/Blogs";
import BlogsDetails from "./pages/BlogsDetails";
import Basket from "./pages/Basket";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import PaymentPage from "./pages/PaymentPage";
import About from "./pages/About";
import Account from "./pages/Account";
import Registration from "./pages/Registration";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./shared/Navbar/Navbar";
import Dropdown from "./shared/Dropdown/Dropdown";
import NavbarMobile from "./shared/NavbarMobile/NavbarMobile";
import Footer from "./shared/Footer/Footer";

// Contexts
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BasketProvider } from "./context/AddToBasket";
import { WishlistProvider } from "./context/WishlistContext";

import MyPet from "./pages/MyPet";
import PickAnimal from "./components/PickAnimal/PickAnimal";
import AboutInfoForPet from "./components/AboutInfoForPet/AboutInfoForPet";
import UXPinLayout from "./pages/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";
import GlobalSearch from "./components/GlobalSearch/GlobalSearch";
import SearchResults from "./components/SearchResults/SearchResults";

// Protected route ümumi yoxlama
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// Dashboard üçün xüsusi qoruma — yalnız "nazrin@gmail.com" istifadəçisi daxil ola bilər
const DashboardProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.email === "nazrin@gmail.com" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

const Layout = ({ children, lang }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/dashboard";

  return (
    <>
      {!hideNavbar && (
        <>
          <Navbar lang={lang} />
         
          <Dropdown />
          <NavbarMobile />
        </>
      )}
      {children}
      {!hideNavbar && <Footer />}
    </>
  );
};

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

  const language = savedLang;

  return (
    <ThemeProvider>
      {" "}
      <ProductProvider>
        <AuthProvider>
          <WishlistProvider>
            <BasketProvider>
              <BrowserRouter>
                <Layout lang={language}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<Details />} />
                    <Route
                      path="/products/discounted_products"
                      element={<DiscountedProducts />}
                    />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:id" element={<BlogsDetails />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/pickanimal" element={<PickAnimal />} />
                    {/* Dashboard üçün xüsusi qoruma tətbiq olunur */}
                    <Route
                      path="/dashboard"
                      element={
                        <DashboardProtectedRoute>
                          <UXPinLayout />
                        </DashboardProtectedRoute>
                      }
                    />
                    <Route path="/infopet" element={<AboutInfoForPet />} />
                    <Route
                      path="/account"
                      element={
                        <ProtectedRoute>
                          <Account />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/mypet"
                      element={
                        <ProtectedRoute>
                          <MyPet />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            </BasketProvider>
          </WishlistProvider>
        </AuthProvider>
      </ProductProvider>
    </ThemeProvider>
  );
};

export default App;
