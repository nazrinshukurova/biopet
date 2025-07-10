import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
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
import MyPet from "./pages/MyPet";
import PickAnimal from "./components/PickAnimal/PickAnimal";
import AboutInfoForPet from "./components/AboutInfoForPet/AboutInfoForPet";
import UXPinLayout from "./pages/Dashboard";
import SearchResults from "./components/SearchResults/SearchResults";
import Contact from "./pages/Contact";

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
import { ThemeProvider } from "./context/ThemeContext";
import PetInfoContext, { PetInfoProvider } from "./context/PetInfoContext";
import ScrollToTop from "./shared/ScrollToTop/ScrollToTop";

// Qorunan route: yalnız login olmuş istifadəçilər üçün
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// Dashboard üçün xüsusi qoruma: yalnız müəyyən email üçün
const DashboardProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.email === "nazrins@gmail.com" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

// Login/Register səhifələrinə yalnız login OLMAMIŞ istifadəçilər keçə bilər
const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" replace />;
};

const Layout = ({ children, lang }) => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/dashboard" || location.pathname === "/payment";

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

const AppRoutes = ({ language }) => {
  const navigate = useNavigate();
  const { petInfo } = useContext(PetInfoContext);
  const location = useLocation();

  useEffect(() => {
    if (petInfo && petInfo.name) {
      if (
        location.pathname === "/mypet" ||
        location.pathname === "/pickanimal"
      ) {
        navigate("/infopet", { replace: true });
      }
    }
  }, [petInfo, navigate, location]);

  return (
    <Layout lang={language}>
      <ScrollToTop />
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
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Registration />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route path="/basket" element={<Basket />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/pickanimal" element={<PickAnimal />} />
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
        <Route
          path="/dashboard"
          element={
            <DashboardProtectedRoute>
              <UXPinLayout />
            </DashboardProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
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

  if (!savedLang) return null; // loading göstərə bilərsən
  

  return (
    <ThemeProvider>
      <ProductProvider>
        <PetInfoProvider>
          <AuthProvider>
            <WishlistProvider>
              <BasketProvider>
                <BrowserRouter>
                  <AppRoutes language={savedLang} />
                </BrowserRouter>
              </BasketProvider>
            </WishlistProvider>
          </AuthProvider>
        </PetInfoProvider>
      </ProductProvider>
    </ThemeProvider>
  );
};

export default App;
