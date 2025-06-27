import React from "react";
import { useProducts } from "../../context/ProductContext";

const GlobalSearch = () => {
  const { filteredProducts, loading } = useProducts();

  if (loading) return <p>Yüklənir...</p>;

  if (filteredProducts.length === 0) return <p>Məhsul tapılmadı.</p>;

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          {/* Digər məlumatlar */}
        </div>
      ))}
    </div>
  );
};

export default GlobalSearch;
