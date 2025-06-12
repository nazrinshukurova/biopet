import React, { createContext, useContext, useState, useEffect } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState(() => {
    const savedItems = localStorage.getItem("basket");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basketItems));
  }, [basketItems]);

  // Automatically hide alert after 2 seconds
  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => setShowSuccessAlert(false), 700);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);

  const addToBasket = (product) => {
    setBasketItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        setShowSuccessAlert(true);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        setShowSuccessAlert(true);
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromBasket = (productId) => {
    setBasketItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  const decreaseQuantity = (productId) => {
    setBasketItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Add total price per item
  const itemsWithTotal = basketItems.map((item) => ({
    ...item,
    total: item.Price * item.quantity,
  }));

  // Calculate total price of basket
  const totalPrice = itemsWithTotal.reduce((sum, item) => sum + item.total, 0);

  // Calculate total discount
  const totalDiscount = basketItems.reduce((sum, item) => {
    if (item.isDiscount) {
      const discountPerItem = (item.Price * item.PercentOfDiscount) / 100;
      return sum + discountPerItem * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <BasketContext.Provider
      value={{
        basketItems: itemsWithTotal,
        addToBasket,
        removeFromBasket,
        clearBasket,
        decreaseQuantity,
        totalDiscount,
        basketCount: basketItems.length,
        totalQuantity: basketItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
        totalPrice,
        showSuccessAlert,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
