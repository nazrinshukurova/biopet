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
import { AddToCart } from "../shared/assets/Buttons/Buttons";
import Footer from "../shared/Footer/Footer";

const Details = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const product = state?.product;
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const getPackageUnit = (lang, product) => {
    if (lang === "az") {
      if (product?.ProductTypeKey === "litter") {
        return `${product?.Package}L`;
      }
      return `${product.Package}q`;
    }

    if (lang === "ru") {
      if (product.ProductTypeKey === "litter") {
        return `${product.Package}л`;
      }
      return `${product.Package}г`;
    }

    return `${product.Package}`;
  };

  let totalPrice;

  const calcDiscountedPrice = (price, percent) => {
    if (product.isDiscount) {
      totalPrice = price - (price / 100) * percent;
    } else {
      totalPrice = price;
    }
  };

  calcDiscountedPrice(product?.Price, product?.PercentOfDiscount);

  console.log(totalPrice);

  const bonus = product?.Price.toFixed(2);
  console.log(product.PercentOfDiscount);

  console.log(product.isDiscount);

  return (
    <>
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

          {product?.Package ? (
            <div className={styles.view_sizes}>
              <div className={styles.view_package}>
                {getPackageUnit(lang, product)}
              </div>
            </div>
          ) : null}
          <div className={styles.info_details}>
            {product.BrandAz ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>{t("brands.brands")}</div>
                <div className={styles.type}>{product.BrandAz}</div>
              </div>
            ) : null}

            {product.CountryAz ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Ölkə" : "Страна"}
                </div>
                <div className={styles.type}>
                  {lang === "az" ? product.CountryAz : product.CountryRu}
                </div>
              </div>
            ) : null}

            {product.ProductTypeKey ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Məhsulun növü" : "Тип продукта"}
                </div>
                <div className={styles.type}>
                  {lang === "az"
                    ? product.ProductTypeAz
                    : product.ProductTypeRu}
                </div>
              </div>
            ) : null}
            {product.FoodTypeKey ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Yemin Növü" : "Тип присяги"}
                </div>
                <div className={styles.type}>
                  {lang === "az" ? product.FoodTypeAz : product.FoodTypeRu}
                </div>
              </div>
            ) : null}
            {product.İsSterilised ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az"
                    ? "Qısırlaşdırma edilib"
                    : "Стерилизация проведена"}
                </div>
                <div className={styles.type}>
                  {lang === "az" && product.İsSterilised
                    ? "Bəli"
                    : lang === "az" && !product.İsSterilised
                    ? "Xeyr"
                    : lang === "ru" && product.İsSterilised
                    ? "Да"
                    : "Нет"}
                </div>
              </div>
            ) : null}
            {product.AnimalKey ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Heyvan növü" : "Тип животного"}
                </div>
                <div className={styles.type}>
                  {lang === "az" ? product.AnimalTypeAz : product.AnimaTypeRu}
                </div>
              </div>
            ) : null}
            {product.IngredientsKey ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Məhsulun tərkibi" : "Состав продукта"}
                </div>
                <div className={styles.type}>
                  {lang === "az"
                    ? product.İngredientsAz
                    : product.İngredientsRu}
                </div>
              </div>
            ) : null}

            {product.AgeKey ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Yaş" : "Возраст"}
                </div>
                <div className={styles.type}>
                  {lang === "az" ? product.AgeAz : product.AgeRu}
                </div>
              </div>
            ) : null}

            {product.DogSizeKey ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "İtin ölçüsü" : "Размер собаки"}
                </div>
                <div className={styles.type}>
                  {lang === "az" ? product.DogSizeAz : product.DogSizeRu}
                </div>
              </div>
            ) : null}

            {product.CookieTypeAz ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Oyuncaqın növü" : "Тип игрушки"}
                </div>
                <div className={styles.type}>
                  {lang === "az" ? product.CookieTypeAz : product.CookieTypeRu}
                </div>
              </div>
            ) : null}

            {product.ColorAz ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Rəng" : "Цвет"}
                </div>
                <div className={styles.type}>
                  {lang === "az" ? product.ColorAz : product.ColorRu}
                </div>
              </div>
            ) : null}

            {product.AromaAz ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Dad" : "Вкус"}
                </div>
                <div className={styles.type}>
                  {lang === "az" ? product.AromaAz : product.AromaRu}
                </div>
              </div>
            ) : null}

            {product.MaterialAz ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Material" : "Материал"}
                </div>
                <div className={styles.type}>
                  {lang === "az" ? product.MaterialAz : product.Materialru}
                </div>
              </div>
            ) : null}

            {product.DietAndPreventionAz ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az"
                    ? "Pəhriz və qarşısının alınması"
                    : "Диета и профилактика"}
                </div>
                <div className={styles.type}>
                  {lang === "az"
                    ? product.DietAndPreventionAz
                    : product.DietAndPreventionRu}
                </div>
              </div>
            ) : null}

            {product.TypeOfAccessoriesAz ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Oyuncaqın növü" : "Тип аксессуара"}
                </div>
                <div className={styles.type}>
                  {lang === "az"
                    ? product.TypeOfAccessoriesAz
                    : product.TypeOfAccessoriesRu}
                </div>
              </div>
            ) : null}

            {product.TypeOfCareProductsAz ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Baxım məhsulları" : "Средства по уходу"}
                </div>
                <div className={styles.type}>
                  {lang === "az"
                    ? product.TypeOfCareProductsAz
                    : product.TypeOfCareProductsRu}
                </div>
              </div>
            ) : null}

            {product.PharmacyAppointmentKey ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az"
                    ? "Aptekın təyinatı"
                    : "Запись на прием в аптеке"}
                </div>
                <div className={styles.type}>
                  {lang === "az"
                    ? product.PharmacyAppointmentAz
                    : product.PharmacyAppointmentRu}
                </div>
              </div>
            ) : null}
            {product.BaytarlıqPəhriziAz ? (
              <div className={styles.type_and_name}>
                <div className={styles.title}>
                  {lang === "az" ? "Baytarlıq pəhrizi" : "Ветеринарная диета"}
                </div>
                <div className={styles.type}>
                  {lang === "az"
                    ? product.BaytarlıqPəhriziAz
                    : product.BaytarlıqPəhriziRu}
                </div>
              </div>
            ) : null}
          </div>

          <div className={styles.info_bonus}>
            <div className={styles.left_info}>
              <div>{t("bonusTitle")}</div>
              <div className={styles.tooltip_container}>
                <Info />
                <div className={styles.tooltip}>
                  <p>{t("bonusDescription")}</p>
                  <div className={styles.tooltip_footer}>{t("bonusRate")}</div>
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
                    style={{ textDecoration: "line-through", fontSize: "26px" }}
                  >
                    {product?.Price.toFixed(2)} AZN
                  </p>
                  <p className={styles.discounted_price}>{totalPrice} AZN</p>
                </div>
              ) : (
                <p className={styles.prices}>{product?.Price.toFixed(2)} AZN</p>
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
      <Footer />
    </>
  );
};

export default Details;
