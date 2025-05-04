import React from "react";
import Banner from "../components/HomeContainer/Banner/Banner";
import CategoriesItem from "../components/HomeContainer/CategoriesItem/CategoriesItem";
import src1 from "../assets/images/home/categoriesİtem/image-208.png";
import src2 from "../assets/images/home/categoriesİtem/image-removebg-preview-3-1-1.png";
import src3 from "../assets/images/home/categoriesİtem/image-removebg-preview-9-1-1.png";
import src4 from "../assets/images/home/categoriesİtem/image-removebg-preview-13-1-1.png";
import category1 from "../assets/images/home/categoriesİtem/hp-category-dog-food.png";
import category2 from "../assets/images/home/categoriesİtem/hp-dog-snacks.png";
import category3 from "../assets/images/home/categoriesİtem/hp-category-dog-accessories.png";
import category4 from "../assets/images/home/categoriesİtem/hp-category-dog-care-products.png";
import category5 from "../assets/images/home/categoriesİtem/hp-category-cat-food.png";
import category6 from "../assets/images/home/categoriesİtem/hp-category-cat-snacks.png";
import category7 from "../assets/images/home/categoriesİtem/hp-category-cat-accessories.png";
import category8 from "../assets/images/home/categoriesİtem/hp-category-cat-care-products.png";
import group1 from "../assets/images/home/categoriesİtem/hp-category-birds-products.png";
import group2 from "../assets/images/home/categoriesİtem/hp-category-rabbits-and-rodents-products.png";
import group3 from "../assets/images/home/categoriesİtem/group-9352.png";

import { useTranslation } from "react-i18next";
import SmallGroups from "../shared/SmallGroups/SmallGroups";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Banner />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CategoriesItem
          category_1={t("category.category_1")}
          category_2={t("category.category_2")}
          src1={src1}
          src2={src2}
          sub_category_1={category1}
          sub_category_2={category2}
          sub_category_3={category3}
          sub_category_4={category4}
        />
        <CategoriesItem
          category_1={t("category.category_3")}
          category_2={t("category.category_4")}
          src1={src3}
          src2={src4}
          sub_category_1={category5}
          sub_category_2={category6}
          sub_category_3={category7}
          sub_category_4={category8}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "32px",
          margin: "0 32px",
        }}
      >
        <SmallGroups title={t("small_groups.birds")} src={group1} />
        <SmallGroups title={t("small_groups.rabbits")} src={group2} />
        <SmallGroups title={t("small_groups.other_animals")} src={group3} />
      </div>
    </div>
  );
};

export default Home;
