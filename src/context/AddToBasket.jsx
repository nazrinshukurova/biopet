import { createContext, useContext, useState, useEffect } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState(() => {
    const savedItems = localStorage.getItem("basket");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basketItems));
  }, [basketItems]);

  const addToBasket = (product) => {
    setBasketItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
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

  // 🧮 Add total price for each item
  const itemsWithTotal = basketItems.map((item) => ({
    ...item,
    total: item.Price * item.quantity,
  }));

  console.log(basketItems);

  const totalPrice = itemsWithTotal.reduce((sum, item) => sum + item.total, 0);

  const decreaseQuantity = (productId) => {
    setBasketItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

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
        basketCount: basketItems.length, // different products
        totalQuantity: basketItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        ), // total quantity
        totalPrice, // total price of the basket
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
