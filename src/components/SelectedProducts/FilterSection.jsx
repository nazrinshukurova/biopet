import { useTranslation } from "react-i18next";
import styles from "../FilterCategories/FilterCategory.module.css";

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
}) => {
  const { t } = useTranslation();

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  console.log(
    "ITEM VALUES:",
    items.map((item) => item.value)
  );

  

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
        {items.filter(matches).map((item) => (
          <li key={item.value}>
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
                <span className={styles.label_text}>{item.value.value}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSection;
