import React, { useEffect, useState } from "react";
import styles from "./FilterCategory.module.css";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../client";
import {
  brands,
  sizeKeys,
  sterilizedKeys,
  sicknessKeys,
  aromaKeys,
  vetDietKeys,
  ageGroupKeys,
  foodTypeKeys,
  animalTypeKeys,
} from "../../constants/filterOptions";
import FilterSection from "../SelectedProducts/FilterSection";

const FilterCategory = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValues, setSearchValues] = useState({
    brand: "",
    aroma: "",
    size: "",
    ill: "",
    age: "",
    diets: "",
    foodType: "",
    sterilized: "",
    animal: "",
  });

  const handleResetSearch = () => {
    setSearchValues({
      brand: "",
      aroma: "",
      size: "",
      ill: "",
      age: "",
      diets: "",
      foodType: "",
      sterilized: "",
      animal: "",
    });
  };

  const createMatches = (searchValue) => (item) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase());

  const generateOptions = (keys, translationKeyPrefix) =>
    keys.map((key) => ({
      value: key,
      label: t(`${translationKeyPrefix}.${key}`),
    }));

  const sizes = generateOptions(sizeKeys, "sizeOfDog");
  const sicknesses = generateOptions(sicknessKeys, "sicknesses");
  const aromas = generateOptions(aromaKeys, "ingredients");
  const vetDiets = generateOptions(vetDietKeys, "vetDiets");
  const ageGroups = generateOptions(ageGroupKeys, "ageGroups");
  const foodTypes = generateOptions(foodTypeKeys, "foodTypes");
  const animalTypes = generateOptions(animalTypeKeys, "animalTypes");

  const sterilized = sterilizedKeys.map((key) => ({
    value: key,
    label: t(key === "true" ? "bəli" : "xeyr"),
  }));

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const { data: Cats, error } = await supabase.from("Cats").select("*");
        if (error) throw error;
        setData(Cats);
        setFilteredData(Cats);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      return Object.entries(searchValues).every(([key, val]) => {
        return !val || (item[key] && item[key].toString() === val);
      });
    });
    setFilteredData(filtered);
  }, [searchValues, data]);

  const renderFilter = (titleKey, valueKey, itemsKey, placeholderKey) => (
    <FilterSection
      title={t(titleKey)}
      searchValue={searchValues[valueKey]}
      setSearchValue={(val) =>
        setSearchValues((prev) => ({ ...prev, [valueKey]: val }))
      }
      items={itemsKey}
      matches={createMatches(searchValues[valueKey])}
      placeholderKey={placeholderKey}
      onResetSearch={handleResetSearch}
    />
  );

  return (
    <div className={styles.left_filter}>
      <div className={styles.filter_list}>
        <span className={styles.category_title}>
          {t("relatedCategories.title")}:
        </span>
        {[
          "Quru_yem",
          "Nəm_yem",
          "Bala_itlər_üçün",
          "Hamilə_və_südverən_itlər_üçün",
          "Müalicəvi_yemlər",
        ].map((cat) => (
          <div key={cat} className={styles.category}>
            {t(`relatedCategories.${cat}`)}
          </div>
        ))}
      </div>

      {renderFilter(
        "animalTypes.title",
        "animal",
        animalTypes,
        "search_placeholders_0"
      )}
      {renderFilter("brend", "brand", brands, "search_placeholders_1")}
      {renderFilter("aroma.title", "aroma", aromas, "search_placeholders_2")}
      {renderFilter("sizeOfDog.title", "size", sizes, "search_placeholders_3")}
      {renderFilter(
        "sterilized",
        "sterilized",
        sterilized,
        "search_placeholders_4"
      )}
      {renderFilter(
        "sicknesses.title",
        "ill",
        sicknesses,
        "search_placeholders_5"
      )}
      {renderFilter(
        "vetDiets.title",
        "diets",
        vetDiets,
        "search_placeholders_6"
      )}
      {renderFilter(
        "ageGroups.title",
        "age",
        ageGroups,
        "search_placeholders_7"
      )}
      {renderFilter(
        "foodTypes.title",
        "foodType",
        foodTypes,
        "search_placeholders_8"
      )}
    </div>
  );
};

export default FilterCategory;
