import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../client";
import { useTranslation } from "react-i18next";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { i18n, t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("Cats").select("*");
    if (error) {
      console.error("Error fetching products:", error);
    } else {
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

  const filteredProducts = products.filter((product) =>
    i18n.language === "az"
      ? product.NameAz?.toLowerCase().includes(searchTerm.toLowerCase())
      : product.NameRu?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredProducts, "PRODUCT");

  const discountedProducts = products
    .filter((product) => product.isDiscount === true)
    .slice(0, 4);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        searchTerm,
        setSearchTerm,
        filteredProducts,
        discountedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProducts = () => useContext(ProductContext);
