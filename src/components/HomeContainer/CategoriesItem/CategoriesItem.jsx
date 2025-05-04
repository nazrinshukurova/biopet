import React from "react";
import styles from "./CategoriesItem.module.css";

import SmallCategory from "../../../shared/SmallCategory/SmallCategory";
import { useTranslation } from "react-i18next";

const CategoriesItem = ({
  category_1,
  category_2,
  src1,
  src2,
  sub_category_1,
  sub_category_2,
  sub_category_3,
  sub_category_4,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.categories_item_container}>
      <div className={styles.headers_container}>
        <div className={styles.categories_item}>
          <div className={styles.box}>
            <span className={styles.header}>{category_1}</span>
          </div>
          <img className={styles.image1} src={src1} alt="dog" />
        </div>
        <div className={styles.categories_item}>
          <div className={styles.box_2}>
            <span className={styles.header_2}>{category_2}</span>
          </div>
          <img className={styles.image2} src={src2} alt="dog" />
        </div>
      </div>
      <div className={styles.small_categories_container}>
        <SmallCategory
          src={sub_category_1}
          title={t("sub_category.sub_category_1")}
        />
        <SmallCategory
          src={sub_category_2}
          title={t("sub_category.sub_category_2")}
        />
        <SmallCategory
          src={sub_category_3}
          title={t("sub_category.sub_category_3")}
        />
        <SmallCategory
          src={sub_category_4}
          title={t("sub_category.sub_category_4")}
        />
      </div>
    </div>
  );
};

export default CategoriesItem;
