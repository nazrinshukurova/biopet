import { useTranslation } from "react-i18next";
import { Car, Dashed, Delete, RedManat } from "../assets/Svg";
import { useBasket } from "../context/AddToBasket";
import styles from "../styles/Basket.module.css";
import { HiOutlineMinusSm } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";
import { HiOutlineTruck } from "react-icons/hi";

const Basket = () => {
  const {
    basketItems,
    addToBasket,
    removeFromBasket,
    totalPrice,
    totalQuantity,
    decreaseQuantity,
  } = useBasket();

  const { i18n, t } = useTranslation();

  const increment = (item) => {
    addToBasket(item);
  };

  const decrement = (item) => {
    if (item.quantity > 1) {
      // Miqdarı bir vahid azalt
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      removeFromBasket(item.id);
      for (let i = 0; i < updatedItem.quantity; i++) {
        addToBasket(updatedItem);
      }
    } else {
      removeFromBasket(item.id);
    }
  };

  return (
    <div className={styles.basket_container}>
      {" "}
      <div className={styles.basket_products}>
        {basketItems && basketItems.length > 0 ? (
          basketItems.map((prod, index) => (
            <div key={prod.id}>
              <div
                className={`${styles.basket_prod} ${
                  index === basketItems.length - 1 ? styles.last : ""
                }`}
              >
                <div className={styles.basket_image_container}>
                  {" "}
                  <img
                    className={styles.basket_image}
                    src={prod.İmage}
                    alt=""
                  />
                </div>
                <div className={styles.basket_info}>
                  <div className={styles.prod_title}>
                    {i18n.language === "az" ? prod.NameAz : prod.NameRu}
                  </div>
                  <div className={styles.price_and_ingredients}>
                    <div className={styles.prod_ingredient}>
                      {t("ingredients.title")} :
                      <span>
                        {i18n.language === "az"
                          ? prod.İngredientsAz
                          : prod.İngredientsRu}
                      </span>
                    </div>
                    <div className={styles.prod_price}>
                      <div className={styles.price_box}>
                        {i18n.language === "az" ? "Qiymət" : "Цена"}:
                        <span style={{ color: "#e21e4c" }}>{prod.Price}</span>
                        <RedManat color="#e21e4c" height="13px" />
                      </div>
                      {/* <div className={styles.price_box}>
                      {i18n.language === "az" ? "Cəmi" : "Итого"}:
                      <span style={{ color: "#e21e4c" }}>{prod.total}</span>
                      <RedManat color="#e21e4c" height="13px" />
                    </div> */}
                    </div>
                  </div>
                </div>
                <div className={styles.counter}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => decreaseQuantity(prod.id)}
                  >
                    <HiOutlineMinusSm />
                  </div>
                  <span>{prod.quantity}</span>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => increment(prod)}
                  >
                    <LuPlus />
                  </div>
                </div>

                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => removeFromBasket(prod.id)}
                >
                  <Delete />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty_basket}>
            {i18n.language === "az" ? "Səbət boşdur" : "Корзина пуста"}
          </div>
        )}
      </div>
      <div className={styles.basket_right}>
        <div className={styles.order_title}>
          <div>{t("order_title")}</div>
          <div>
            <HiOutlineTruck
              style={{ height: "20px", width: "20px", color: "#e21e4c" }}
            />
          </div>
        </div>
        <div className={styles.order_total}>
          <div>{t("total_price")}</div>
          <div>{totalPrice.toFixed(2)}man</div>
        </div>
        <Dashed
          style={{ margin: " 2.4rem 0 2.8rem", paddingBottom: " 3.2rem" }}
        />
      </div>
    </div>
  );
};

export default Basket;
