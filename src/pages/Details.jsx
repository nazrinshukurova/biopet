import { useLocation, useParams } from "react-router-dom";
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
import { useState, useEffect } from "react";

const Details = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const product = state?.product;
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

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

  return (
    <>
      {loading ? (
        <div className="spinner"></div>
      ) : (
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
                {
                  key: "CookieTypeAz",
                  title: lang === "az" ? "Oyuncaqın növü" : "Тип игрушки",
                  value:
                    lang === "az" ? product.CookieTypeAz : product.CookieTypeRu,
                },
                {
                  key: "ColorAz",
                  title: lang === "az" ? "Rəng" : "Цвет",
                  value: lang === "az" ? product.ColorAz : product.ColorRu,
                },
                {
                  key: "AromaAz",
                  title: lang === "az" ? "Dad" : "Вкус",
                  value: lang === "az" ? product.AromaAz : product.AromaRu,
                },
                {
                  key: "MaterialAz",
                  title: lang === "az" ? "Material" : "Материал",
                  value:
                    lang === "az" ? product.MaterialAz : product.Materialru,
                },
                {
                  key: "DietAndPreventionAz",
                  title:
                    lang === "az"
                      ? "Pəhriz və qarşısının alınması"
                      : "Диета и профилактика",
                  value:
                    lang === "az"
                      ? product.DietAndPreventionAz
                      : product.DietAndPreventionRu,
                },
                {
                  key: "TypeOfAccessoriesAz",
                  title: lang === "az" ? "Oyuncaqın növü" : "Тип аксессуара",
                  value:
                    lang === "az"
                      ? product.TypeOfAccessoriesAz
                      : product.TypeOfAccessoriesRu,
                },
                {
                  key: "TypeOfCareProductsAz",
                  title:
                    lang === "az" ? "Baxım məhsulları" : "Средства по уходу",
                  value:
                    lang === "az"
                      ? product.TypeOfCareProductsAz
                      : product.TypeOfCareProductsRu,
                },
                {
                  key: "PharmacyAppointmentKey",
                  title:
                    lang === "az"
                      ? "Aptekın təyinatı"
                      : "Запись на прием в аптеке",
                  value:
                    lang === "az"
                      ? product.PharmacyAppointmentAz
                      : product.PharmacyAppointmentRu,
                },
                {
                  key: "BaytarlıqPəhriziAz",
                  title:
                    lang === "az" ? "Baytarlıq pəhrizi" : "Ветеринарная диета",
                  value:
                    lang === "az"
                      ? product.BaytarlıqPəhriziAz
                      : product.BaytarlıqPəhriziRu,
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
                <AddToCart />
                <div className={styles.view_like}>
                  <Heart />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Details;
