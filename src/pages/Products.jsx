import React from "react";
import FilterCategory from "../components/FilterCategories/FilterCategory";
import Footer from "../shared/Footer/Footer";

const Products = () => {
  return (
    <div>
      <div
        style={{
          padding: "25px",
        }}
      >
        <FilterCategory />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
