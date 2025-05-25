import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../client.js";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("Cats").select("*");
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      // String sahələri təmizləmək (trim)
      const trimmedData = data.map((item) => {
        const trimmedItem = {};
        for (const key in item) {
          const value = item[key];
          trimmedItem[key] = typeof value === "string" ? value.trim() : value;
        }
        return trimmedItem;
      });

      setProducts(trimmedData); 
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};


export const useProducts = () => useContext(ProductContext);

