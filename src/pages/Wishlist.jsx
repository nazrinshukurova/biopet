import React from "react";
import Footer from "../shared/Footer/Footer";
import AddToCart from "../shared/Buttons/Buttons";
import { EmptyStarSvg, FullFilledStarSvg, Wished } from "../assets/Svg";
import { useWishlist } from "../context/WishlistContext";
import styles from "../components/FilterCategories/FilterCategory";
import { useTranslation } from "react-i18next";
import WishlistComp from "../components/WishlistComponent/WishlistComp";

const Wishlist = () => {


  return (
    <div>
      <WishlistComp />
    </div>
  );
};

export default Wishlist;
