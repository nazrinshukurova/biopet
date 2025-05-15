import React, { useEffect, useState } from "react";
import styles from "./FilterCategory.module.css";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../client";
import {
  brands,
  sizeKeys,
  sterilizedKeys,
  sicknessKeys,
  ingredientsKeys,
  vetDietKeys,
  ageGroupKeys,
  foodTypeKeys,
  animalTypeKeys,
  productTypeKeys,
} from "../../constants/filterOptions";
import FilterSection from "../SelectedProducts/FilterSection";
import { EmptyStarSvg, FullFilledStarSvg } from "../../assets/svg";
import { AddToCart } from "../../shared/assets/Buttons/Buttons";

const FilterCategory = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSicknesses, setSelectedSicknesses] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedSterilized, setSelectedSterilized] = useState([]);
  const [selectedIsAvailable, setSelectedIsAvailable] = useState([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
  const [selectedAnimalTypes, setSelectedAnimalTypes] = useState([]);
  const [selectedVetDiets, setSelectedVetDiets] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState([]);

  const [searchValues, setSearchValues] = useState({
    brand: "",
    ingredients: "",
    size: "",
    ill: "",
    age: "",
    diets: "",
    foodType: "",
    sterilized: "",
    isAvailable: "",
    animal: "",
    productType: "",
  });

  const handleResetSearch = () => {
    setSearchValues({
      brand: "",
      ingredients: "",
      size: "",
      ill: "",
      age: "",
      diets: "",
      foodType: "",
      sterilized: "",
      isAvailable: "",
      animal: "",
      productType: "",
    });
  };

  const createMatches = (searchValue) => (item) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase());

  const generateOptions = (keys, translationKeyPrefix) =>
    keys.map((key) => ({
      value: key,
      label: t(`${translationKeyPrefix}.${key}`),
    }));

  console.log(ingredientsKeys.map((el) => el));

  const sizes = generateOptions(sizeKeys, "sizeOfDog");
  const sicknesses = generateOptions(sicknessKeys, "sicknesses");
  const ingredients = generateOptions(ingredientsKeys, "ingredients");
  const vetDiets = generateOptions(vetDietKeys, "vetDiets");
  const ageGroups = generateOptions(ageGroupKeys, "ageGroups");
  const foodTypes = generateOptions(foodTypeKeys, "foodTypes");
  const animalTypes = generateOptions(animalTypeKeys, "animalTypes");
  const productTypes = generateOptions(productTypeKeys, "productTypes");

  console.log(animalTypes)
    console.log(animalTypes.map((el)=>el.value.value))


  const sterilized = sterilizedKeys.map((key) => ({
    value: key,
    label: t(key === "true" ? "bəli" : "xeyr"),
  }));

  const available = sterilizedKeys.map((key) => ({
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
        // string sahələri trim etmək
        const trimmedData = data.map((item) => {
          const trimmedItem = {};
          for (const key in item) {
            const value = item[key];
            trimmedItem[key] = typeof value === "string" ? value.trim() : value;
          }
          return trimmedItem;
        });

        setData(trimmedData);
        setFilteredData(trimmedData);
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
        selectedBrands.includes(item?.BrandAz, "BrandAz")
      );
      console.log(filtered);
    }

    console.log(filtered);
    console.log(selectedBrands);

    console.log(filtered.filter((el) => el.BrandAz === "Royal Canin"));

    if (selectedIngredients.length > 0) {
      filtered = filtered.filter((item) =>
        selectedIngredients.includes(getValue(item, "İngredients"))
      );
    }

    // console.log(selectedIngredients);
    // console.log(filtered);
    // console.log(filtered);

    // console.log(filtered.filter((item) => item.İngredientsAz === "Mal əti"));

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

    if (selectedSterilized.length > 0) {
      filtered = filtered.filter((item) =>
        selectedSterilized.includes(item.İsSterilised?.toString())
      );
    }

    //!Stoku yoxlayacam

    if (selectedIsAvailable.length > 0) {
      filtered = filtered.filter((item) =>
        selectedIsAvailable.includes(item.InStock?.toString())
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

    if (selectedProductType.length > 0) {
      filtered = filtered.filter((item) =>
        selectedProductType.includes(getValue(item, "ProductType"))
      );
    }

    // if (selectedAnimalTypes.length > 0) {
    //   filtered = filtered.filter((item) =>
    //     selectedAnimalTypes.includes(getValue(item, "AnimalType"))
    //   );
    // }

    if (selectedAnimalTypes.length > 0) {
      const keys = selectedAnimalTypes.map((el) => el.key);

      filtered = filtered.filter((item) => keys.includes(item.AnimalKey));
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
    selectedIngredients,
    selectedSterilized,
    selectedAgeGroups,
    selectedFoodTypes,
    selectedAnimalTypes,
    selectedVetDiets,
    selectedIsAvailable,
    selectedProductType,
    data,
    i18n.language, // re-run when language changes
  ]);

  console.log(animalTypeKeys.map((el) => el.value));

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
          "ingredients.title",
          "ingredients",
          ingredients,
          "search_placeholders_2",
          selectedIngredients,
          setSelectedIngredients
        )}
        {renderFilter(
          "isAvailable",
          "isAvailable",
          available,
          "search_placeholders_9",
          selectedIsAvailable,
          setSelectedIsAvailable
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
        {renderFilter(
          "productTypes.title",
          "productType",
          productTypes,
          "search_placeholders_8",
          selectedProductType,
          setSelectedProductType
        )}
      </div>{" "}
      <div className={styles.filtered_result}>
        {filteredData.map((item) => (
          <div key={item.id} className={styles.filtered_item}>
            <div className={styles.item_image}>
              {" "}
              <img height="172px" width="172px" src={item.İmage}></img>
            </div>
            <div className={styles.item_desc}>
              {" "}
              <div className={styles.price}>{item.Price} AZN</div>
              <div className={styles.item_title}>
                {" "}
                {i18n.language === "az" ? item.NameAz : item.NameRu}
              </div>
              <div className={styles.rating}>
                {item?.Rating === 0 ? <EmptyStarSvg /> : <FullFilledStarSvg />}
                {item.Rating}
              </div>
              {item.Package && (
                <div className={styles.item_package}>
                  {i18n.language === "az"
                    ? `${item.Package}q`
                    : `${item.Package}г`}
                </div>
              )}
            </div>
            <AddToCart />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCategory;
