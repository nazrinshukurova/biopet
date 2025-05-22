import { useTranslation } from "react-i18next";
import styles from "../FilterCategories/FilterCategory.module.css";
import i18n from "i18next";
import { Skeleton } from "@mui/material";

const FilterSection = ({
  title,
  searchValue,
  setSearchValue,
  items,
  matches,
  placeholderKey,
  onResetSearch,
  selectedValues,
  onChange,
  loading,
}) => {
  const { t } = useTranslation();

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  if (loading) {
    return (
      <div className={styles.brands_list}>
        <Skeleton
          variant="text"
          height={30}
          sx={{ width: "60%", marginBottom: "10px", borderRadius: "4px" }}
        />
        <Skeleton
          variant="rectangular"
          height={36}
          sx={{ width: "100%", marginBottom: "20px", borderRadius: "4px" }}
        />
        <ul className={styles.filter__list}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <li key={idx}>
              <div className={styles.form_group}>
                <Skeleton
                  variant="text"
                  height={20}
                  sx={{ width: "80%", borderRadius: "4px" }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.brands_list}>
      <p className={styles.title}>{t(title)}</p>

      <input
        type="text"
        placeholder={t(placeholderKey)}
        className={styles.filter__search}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onResetSearch();
        }}
      />

      <ul className={styles.filter__list}>
        {items.filter(matches).map((item, idx) => (
          <li key={idx}>
            <div className={styles.form_group}>
              <label>
                <input
                  type="checkbox"
                  value={item.value}
                  checked={selectedValues?.includes(item.value)}
                  onChange={() => handleCheckboxChange(item.value)}
                  className={styles.hidden_checkbox}
                />
                <span className={styles.check_box}></span>
                <span className={styles.label_text}>
                  {i18n.language === "az"
                    ? item.value.valueAz
                    : item.value.valueRu}
                </span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSection;
