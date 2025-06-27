import { useParams } from "react-router-dom";
import styles from "../styles/Details.module.css";
import { useTranslation } from "react-i18next";
import {
  EmptyStarSvg,
  FullFilledStarSvg,
  Gift,
  HalfStarSvg,
  Heart,
  Info,
} from "../assets/Svg";
import Footer from "../shared/Footer/Footer";
import AddToCart from "../shared/Buttons/Buttons";
import { useProducts } from "../context/ProductContext"; // düz yol ver
import { useBasket } from "../context/AddToBasket";
import Suggestions from "../shared/SuggestionsProducts/Suggestions";
import { useWishlist } from "../context/WishlistContext";

const Details = () => {
  const { id } = useParams();
  const { products, loading } = useProducts(); // context-dən gələn data
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const product = products.find((p) => p.id?.toString() === id);

  if (loading) return <div className="spinner"></div>;
  if (!product) return <div>Bu məhsul tapılmadı.</div>;

  const getPackageUnit = (lang, product) => {
    if (lang === "az") {
      return product?.ProductTypeKey === "litter"
        ? `${product?.Package}L`
        : `${product.Package}q`;
    }

    if (lang === "ru") {
      return product?.ProductTypeKey === "litter"
        ? `${product.Package}л`
        : `${product.Package}г`;
    }

    return `${product.Package}`;
  };

  const calcDiscountedPrice = (price, percent) => {
    return product?.isDiscount
      ? (price - (price / 100) * percent).toFixed()
      : price?.toFixed();
  };

  const totalPrice = calcDiscountedPrice(
    product?.Price,
    product?.PercentOfDiscount
  );
  const bonus = product?.Price?.toFixed(2);

  const { addToBasket } = useBasket();

  const {addToWishlist}=useWishlist()

  console.log(product.id, "DETAILS");

  return (
    <>
      {" "}
      <div
        style={{
          backgroundColor: "var(--container-bg)",
          color: "var(--textColor)",
          padding: "50px 0px",
        }}
      >
        <div className={styles.image_and_description}>
          <div className={styles.image_container}>
            <img src={product?.İmage} alt="product" />
          </div>
          <div className={styles.view_details}>
            <h1 className={styles.view_title}>
              {lang === "az" ? product?.NameAz : product?.NameRu}
            </h1>

            <div className={styles.view_rating}>
              <div>{product?.Rating}/5</div>
              <div className={styles.view_stars}>
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = product?.Rating || 0;
                  if (i + 1 <= Math.floor(rating)) {
                    return <FullFilledStarSvg key={i} />;
                  } else if (
                    i < rating &&
                    rating % 1 >= 0.5 &&
                    i === Math.floor(rating)
                  ) {
                    return <HalfStarSvg key={i} />;
                  } else {
                    return <EmptyStarSvg key={i} />;
                  }
                })}
              </div>
            </div>

            <h5 className={styles.view_packaging}>{t("packaging")}</h5>
            {product?.Package && (
              <div className={styles.view_sizes}>
                <div className={styles.view_package}>
                  {getPackageUnit(lang, product)}
                </div>
              </div>
            )}

            <div className={styles.info_details}>
              {[
                {
                  key: "BrandAz",
                  title: t("brands.brands"),
                  value: product.BrandAz,
                },
                {
                  key: "CountryAz",
                  title: lang === "az" ? "Ölkə" : "Страна",
                  value: lang === "az" ? product.CountryAz : product.CountryRu,
                },
                {
                  key: "ProductTypeKey",
                  title: lang === "az" ? "Məhsulun növü" : "Тип продукта",
                  value:
                    lang === "az"
                      ? product.ProductTypeAz
                      : product.ProductTypeRu,
                },
                {
                  key: "FoodTypeKey",
                  title: lang === "az" ? "Yemin Növü" : "Тип присяги",
                  value:
                    lang === "az" ? product.FoodTypeAz : product.FoodTypeRu,
                },
                {
                  key: "İsSterilised",
                  title:
                    lang === "az"
                      ? "Qısırlaşdırma edilib"
                      : "Стерилизация проведена",
                  value: product.İsSterilised
                    ? lang === "az"
                      ? "Bəli"
                      : "Да"
                    : lang === "az"
                    ? "Xeyr"
                    : "Нет",
                },
                {
                  key: "AnimalKey",
                  title: lang === "az" ? "Heyvan növü" : "Тип животного",
                  value:
                    lang === "az" ? product.AnimalTypeAz : product.AnimaTypeRu,
                },
                {
                  key: "İngredientsAz",
                  title: lang === "az" ? "Məhsulun tərkibi" : "Состав продукта",
                  value:
                    lang === "az"
                      ? product.İngredientsAz
                      : product.İngredientsRu,
                },
                {
                  key: "AgeKey",
                  title: lang === "az" ? "Yaş" : "Возраст",
                  value: lang === "az" ? product.AgeAz : product.AgeRu,
                },
                {
                  key: "DogSizeKey",
                  title: lang === "az" ? "İtin ölçüsü" : "Размер собаки",
                  value: lang === "az" ? product.DogSizeAz : product.DogSizeRu,
                },
              ]
                .filter((item) => product[item.key])
                .map((item, index) => (
                  <div key={index} className={styles.type_and_name}>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.type}>{item.value}</div>
                  </div>
                ))}
            </div>

            <div className={styles.info_bonus}>
              <div className={styles.left_info}>
                <div>{t("bonusTitle")}</div>
                <div className={styles.tooltip_container}>
                  <Info />
                  <div className={styles.tooltip}>
                    <p>{t("bonusDescription")}</p>
                    <div className={styles.tooltip_footer}>
                      {t("bonusRate")}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.right_info}>
                +{bonus} <Gift />
              </div>
            </div>

            <div className={styles.price_and_buttons}>
              <div className={styles.view_price}>
                <h5 className={styles.view_price_title}>
                  {lang === "az" ? "Qiymət" : "Цена"}
                </h5>
                {product?.isDiscount ? (
                  <div className={styles.allOfPrices}>
                    <p
                      className={styles.prices}
                      style={{
                        textDecoration: "line-through",
                        fontSize: "26px",
                      }}
                    >
                      {product?.Price?.toFixed(2)} AZN
                    </p>
                    <p className={styles.discounted_price}>{totalPrice} AZN</p>
                  </div>
                ) : (
                  <p className={styles.prices}>
                    {product?.Price?.toFixed(2)} AZN
                  </p>
                )}
              </div>
              <div className={styles.button_and_heart}>
                <AddToCart onClick={() => addToBasket(product)} />

                <div onClick={()=>addToWishlist(product.id)} className={styles.view_like}>
                  <Heart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suggestions />
    </>
  );
};

export default Details;
