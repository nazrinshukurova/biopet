import React from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="not_found">
      <div className="not_found_number"> 404</div>
      <div className="not_found_title"> {t("not_found")}</div>
    </div>
  );
};

export default NotFound;
