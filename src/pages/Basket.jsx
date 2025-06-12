import { useTranslation } from "react-i18next";
import { Car, Cart2, Dashed, Delete, RedManat, Shopping } from "../assets/Svg";
import { useBasket } from "../context/AddToBasket";
import styles from "../styles/Basket.module.css";
import { HiOutlineMinusSm, HiOutlineTruck } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";
import { FinishTheOrder } from "../shared/Buttons/Buttons";
import Footer from "../shared/Footer/Footer";
import { Link } from "react-router-dom";

const Basket = () => {
  const {
    basketItems,
    addToBasket,
    removeFromBasket,
    totalPrice,
    totalQuantity,
    decreaseQuantity,
    totalDiscount,
  } = useBasket();

  const { i18n, t } = useTranslation();

  const increment = (item) => {
    addToBasket(item);
  };

  const decrement = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      removeFromBasket(item.id);
      for (let i = 0; i < updatedItem.quantity; i++) {
        addToBasket(updatedItem);
      }
    } else {
      removeFromBasket(item.id);
    }
  };

  if (!basketItems || basketItems.length === 0) {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: " #fff",
          }}
          className={styles.basket_container}
        >
          <Shopping />

          <div className={styles.empty_basket}>
            {i18n.language === "az"
              ? "🤯 İnanmaq çətin olsa da səbətiniz boşdur"
              : "🤯 Трудно поверить, но ваша корзина пуста."}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className={styles.basket_container}>
        <div className={styles.basket_products}>
          {basketItems.map((prod, index) => (
            <div key={prod.id}>
              <div
                className={`${styles.basket_prod} ${
                  index === basketItems.length - 1 ? styles.last : ""
                }`}
              >
                <div className={styles.basket_image_container}>
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
                    {prod.İngredientsAz && (
                      <div className={styles.prod_ingredient}>
                        {t("ingredients.title")}:
                        <span>
                          {i18n.language === "az"
                            ? prod.İngredientsAz
                            : prod.İngredientsRu}
                        </span>
                      </div>
                    )}

                    <div className={styles.prod_price}>
                      <div className={styles.price_box}>
                        {i18n.language === "az" ? "Qiymət" : "Цена"}:
                        {prod.isDiscount ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                marginRight: "8px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#828282",
                                  textDecoration: "line-through",
                                  marginRight: "2px",
                                }}
                              >
                                {prod.Price.toFixed(2)}
                              </span>
                              <RedManat color="#828282" height="10px" />
                            </div>

                            <span style={{ color: "#e21e4c" }}>
                              {(
                                prod.Price -
                                (prod.Price / 100) * prod.PercentOfDiscount
                              ).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span style={{ color: "#e21e4c" }}>
                            {prod.Price.toFixed(2)}
                          </span>
                        )}
                        <RedManat color="#e21e4c" height="13px" />
                      </div>
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
          ))}
        </div>

        <div className={styles.basket_right}>
          <div className={styles.order_title}>
            <div>{t("order_title")}</div>
            <HiOutlineTruck
              style={{ height: "20px", width: "20px", color: "#e21e4c" }}
            />
          </div>

          <div className={styles.order_total}>
            <div>{t("total_price")}</div>
            <div>{totalPrice.toFixed(2)}man</div>
          </div>

          <Dashed style={{ margin: "24px 0 28px", paddingBottom: "32px" }} />

          <div className={styles.order_total}>
            <div>{t("total_discount")}</div>
            <div>-{totalDiscount.toFixed(2)}man</div>
          </div>

          <Dashed style={{ margin: "24px 0 28px", paddingBottom: "32px" }} />

          <div className={styles.order_total}>
            <div>{t("total")}</div>
            <div>{(totalPrice - totalDiscount).toFixed(2)}man</div>
          </div>

          <Dashed style={{ margin: "24px 28px", paddingBottom: "32px" }} />

          <Link style={{textDecoration:"none"}} to="/checkout">
            {" "}
            <FinishTheOrder />
          </Link>
          <div className={styles.delivery_policy}>{t("delivery_policy")}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Basket;
