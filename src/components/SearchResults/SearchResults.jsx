import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import styles from "./SearchResults.module.css";
import { useTranslation } from "react-i18next";

const SearchResults = () => {
  const { filteredProducts, loading, searchTerm, setSearchTerm } =
    useProducts();
  const { i18n, t } = useTranslation();
  const containerRef = useRef(null);

  if (loading) return <p>Loading...</p>;
  if (!searchTerm.trim()) return null;

  return (
    <div className={styles.full_container} ref={containerRef}>
      <div className={styles.search_title}>
        {i18n.language === "az"
          ? "Tövsiyə olunan məhsullar"
          : "Рекомендуемые продукты"}
      </div>
      <div className={styles.search_pop_up}>
        {filteredProducts.length === 0 ? (
          <div className={styles.empty_message}>
            {t("search.noResults", "Nəticə tapılmadı.")}
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={styles.product_card}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => setTimeout(() => setSearchTerm(""), 0)}
            >
              <div className={styles.img_box}>
                <img
                  width="100%"
                  height="100%"
                  src={product.İmage}
                  alt="product"
                />
              </div>
              <div className={styles.product_name}>
                {i18n.language === "az" ? product.NameAz : product.NameRu}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
