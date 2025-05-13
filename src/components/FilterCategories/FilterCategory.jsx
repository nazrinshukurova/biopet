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
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSicknesses, setSelectedSicknesses] = useState([]);
  const [selectedAromas, setSelectedAromas] = useState([]);
  const [selectedSterilized, setSelectedSterilized] = useState([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
  const [selectedAnimalTypes, setSelectedAnimalTypes] = useState([]);
  const [selectedVetDiets, setSelectedVetDiets] = useState([]);

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

  const renderFilter = (
    titleKey,
    valueKey,
    itemsKey,
    placeholderKey,
    selectedState,
    setSelectedState
  ) => (
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
      selectedValues={selectedState}
      onChange={setSelectedState}
    />
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("Cats").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setData(data);
        setFilteredData(data);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const suffix = i18n.language === "az" ? "Az" : "Ru";
    const getValue = (item, key) => item[`${key}${suffix}`];

    let filtered = data;

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((item) =>
        selectedBrands.includes(getValue(item, "Brand"))
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((item) =>
        selectedSizes.includes(getValue(item, "Size"))
      );
    }

    if (selectedSicknesses.length > 0) {
      filtered = filtered.filter((item) =>
        selectedSicknesses.some((ill) =>
          getValue(item, "Sicknesses")?.includes(ill)
        )
      );
    }

    if (selectedAromas.length > 0) {
      filtered = filtered.filter((item) =>
        selectedAromas.includes(getValue(item, "Aroma"))
      );
    }

    if (selectedSterilized.length > 0) {
      filtered = filtered.filter((item) =>
        selectedSterilized.includes(item.isSterilized?.toString())
      );
    }

    if (selectedAgeGroups.length > 0) {
      filtered = filtered.filter((item) =>
        selectedAgeGroups.includes(getValue(item, "Age"))
      );
    }

    if (selectedFoodTypes.length > 0) {
      filtered = filtered.filter((item) =>
        selectedFoodTypes.includes(getValue(item, "FoodType"))
      );
    }

    if (selectedAnimalTypes.length > 0) {
      filtered = filtered.filter((item) =>
        selectedAnimalTypes.includes(getValue(item, "AnimalType"))
      );
    }

    if (selectedVetDiets.length > 0) {
      filtered = filtered.filter((item) =>
        selectedVetDiets.some((diet) =>
          getValue(item, "BaytarlıqPəhrizi")?.includes(diet)
        )
      );
    }

    setFilteredData(filtered);
  }, [
    selectedBrands,
    selectedSizes,
    selectedSicknesses,
    selectedAromas,
    selectedSterilized,
    selectedAgeGroups,
    selectedFoodTypes,
    selectedAnimalTypes,
    selectedVetDiets,
    data,
    i18n.language, // re-run when language changes
  ]);

  return (
    <div className={styles.common_container}>
      {" "}
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
          "search_placeholders_0",
          selectedAnimalTypes,
          setSelectedAnimalTypes
        )}
        {renderFilter(
          "brend",
          "brand",
          brands,
          "search_placeholders_1",
          selectedBrands,
          setSelectedBrands
        )}
        {renderFilter(
          "aroma.title",
          "aroma",
          aromas,
          "search_placeholders_2",
          selectedAromas,
          setSelectedAromas
        )}
        {renderFilter(
          "sizeOfDog.title",
          "size",
          sizes,
          "search_placeholders_3",
          selectedSizes,
          setSelectedSizes
        )}
        {renderFilter(
          "sterilized",
          "sterilized",
          sterilized,
          "search_placeholders_4",
          selectedSterilized,
          setSelectedSterilized
        )}
        {renderFilter(
          "sicknesses.title",
          "ill",
          sicknesses,
          "search_placeholders_5",
          selectedSicknesses,
          setSelectedSicknesses
        )}
        {renderFilter(
          "vetDiets.title",
          "diets",
          vetDiets,
          "search_placeholders_6",
          selectedVetDiets,
          setSelectedVetDiets
        )}
        {renderFilter(
          "ageGroups.title",
          "age",
          ageGroups,
          "search_placeholders_7",
          selectedAgeGroups,
          setSelectedAgeGroups
        )}
        {renderFilter(
          "foodTypes.title",
          "foodType",
          foodTypes,
          "search_placeholders_8",
          selectedFoodTypes,
          setSelectedFoodTypes
        )}
      </div>{" "}
      <div className={styles.filtered_result}>
        {filteredData.map((item) => (
          <div key={item.id} className={styles.filtered_item}>
            {i18n.language === "az" ? item.NameAz : item.NameRu}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCategory;
