import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const SortSelect = ({ onChange }) => {
  const { t } = useTranslation();

  const sortOptions = [
    { value: "priceWithIncrease", label: t("select_values.priceWithIncrease") },
    { value: "priceWithDecrease", label: t("select_values.priceWithDecrease") },
    { value: "AtoZ", label: t("select_values.AtoZ") },
    { value: "ZtoA", label: t("select_values.ZtoA") },
  ];

  return (
    <Select
      style={{ width: 200 }}
      placeholder={t("select_values.priceWithIncrease")} // or a general placeholder
      options={sortOptions}
      onChange={onChange}
    />
  );
};

export default SortSelect;
