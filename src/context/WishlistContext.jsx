import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  const [loadingWishlistId, setLoadingWishlistId] = useState(null); // loading üçün əlavə state

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = async (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setLoadingWishlistId(product.id); // loading başlasın
      // Sadəcə loading görünsün deyə kiçik gecikmə əlavə edə bilərik
      await new Promise((resolve) => setTimeout(resolve, 500)); // opsional

      setWishlist([...wishlist, product]);
      setLoadingWishlistId(null); // loading bitsin
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        loadingWishlistId,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
