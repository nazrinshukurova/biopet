import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const SortSelect = ({ products, onSorted }) => {
  const { t } = useTranslation();

  const sortOptions = [
    { value: "priceWithIncrease", label: t("select_values.priceWithIncrease") },
    { value: "priceWithDecrease", label: t("select_values.priceWithDecrease") },
    { value: "AtoZ", label: t("select_values.AtoZ") },
    { value: "ZtoA", label: t("select_values.ZtoA") },
  ];

  const lang = localStorage.getItem("i18nextLng");
  console.log(lang);

  console.log(products);

  const handleChange = (value) => {
    const sorted = [...products];

    switch (value) {
      case "priceWithIncrease":
        sorted.sort((a, b) => a.Price - b.Price);
        break;
      case "priceWithDecrease":
        sorted.sort((a, b) => b.Price - a.Price);
        break;
      case "AtoZ":
        sorted.sort((a, b) =>
          lang === "ru"
            ? a.NameRu.localeCompare(b.NameRu)
            : a.NameAz.localeCompare(b.NameAz)
        );
        break;
      case "ZtoA":
        sorted.sort((a, b) =>
          lang === "ru"
            ? b.NameRu.localeCompare(a.NameRu)
            : b.NameAz.localeCompare(a.NameAz)
        );
        break;
      default:
        break;
    }

    onSorted(sorted); // parent-ə göndəririk
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder={t("select_values.priceWithIncrease")}
      options={sortOptions}
      onChange={handleChange}
    />
  );
};

export default SortSelect;
