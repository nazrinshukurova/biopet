import React, { useEffect, useState } from "react";
import styles from "./FilterCategory.module.css";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../client";
import {
  brands,
  sizeKeys,
  sterilizedKeys,
  ingredientsKeys,
  vetDietKeys,
  ageGroupKeys,
  foodTypeKeys,
  animalTypeKeys,
  productTypeKeys,
} from "../../constants/filterOptions";
import FilterSection from "../SelectedProducts/FilterSection";
import { EmptyStarSvg, FullFilledStarSvg, Manat } from "../../assets/Svg";
import { AddToCart } from "../../shared/assets/Buttons/Buttons";
import RangeSlider from "../../assets/sliders/RangeSlider";
import IOSSwitch from "../../assets/sliders/Toggle";
import { useNavigate } from "react-router-dom";

const FilterCategory = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedSterilized, setSelectedSterilized] = useState([]);
  const [selectedIsAvailable, setSelectedIsAvailable] = useState([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
  const [selectedAnimalTypes, setSelectedAnimalTypes] = useState([]);
  const [selectedVetDiets, setSelectedVetDiets] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState([]);

  const maxPrice = Math.max(...data.map((el) => el.Price)) + 50;

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
    item?.label?.toLowerCase().includes(searchValue.toLowerCase());

  const generateOptions = (keys, translationKeyPrefix) =>
    keys.map((key) => ({
      value: key,
      label: t(`${translationKeyPrefix}.${key}`),
    }));

  console.log(ingredientsKeys.map((el) => el));

  const sizes = generateOptions(sizeKeys, "sizeOfDog");
  const ingredients = generateOptions(ingredientsKeys, "ingredients");
  const vetDiets = generateOptions(vetDietKeys, "vetDiets");
  const ageGroups = generateOptions(ageGroupKeys, "ageGroups");
  const foodTypes = generateOptions(foodTypeKeys, "foodTypes");
  const animalTypes = generateOptions(animalTypeKeys, "animalTypes");
  const productTypes = generateOptions(productTypeKeys, "productTypes");
  const brand = generateOptions(brands, "brands");
  const sterilized = generateOptions(sterilizedKeys, "sterilized");
  const available = generateOptions(sterilizedKeys, "available");

  console.log(animalTypes);
  console.log(animalTypes.map((el) => el.value.value));

  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice]);

  const handleInputChange = (index, value) => {
    const updatedRange = [...priceRange];

    if (value === "") {
      updatedRange[index] = value; // boş buraxmağa icazə ver
    } else {
      updatedRange[index] = Number(value);
    }

    setPriceRange(updatedRange);
  };

  console.log(priceRange, "Updated range");

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
    let filtered = data;

    if (selectedBrands.length > 0) {
      const keys = selectedBrands.map((el) => el.key);
      if (keys.length > 0) {
        const baseUrl = window.location.origin + window.location.pathname;
        const queryString = `?brand=${keys.join("&")}`;

        window.history.replaceState({}, "", baseUrl + queryString);
      }

      filtered = filtered.filter((item) => keys.includes(item.BrandKey));
      console.log(filtered);
      console.log(keys);
    } else {
      const baseUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, "", baseUrl);
    }

    if (selectedIngredients.length > 0) {
      const keys = selectedIngredients.map((el) => el.key);

      if (keys.length > 0) {
        const baseUrl = window.location.origin + window.location.pathname;
        const queryString = `?ingedient=${keys.join("&")}`;

        window.history.replaceState({}, "", baseUrl + queryString);
      }
      filtered = filtered.filter((item) => keys.includes(item.IngredientsKey));
    } 

    if (selectedVetDiets.length > 0) {
      const keys = selectedVetDiets.map((el) => el.key);

      if (keys.length > 0) {
        const baseUrl = window.location.origin + window.location.pathname;
        const queryString = `?animal=${keys.join("&")}`;

        window.history.replaceState({}, "", baseUrl + queryString);
      }
      filtered = filtered.filter((item) =>
        keys.includes(item.PharmacyAppointmentKey)
      );
    } 

    if (selectedSizes.length > 0) {
      const keys = selectedSizes.map((el) => el.key);

      if (keys.length > 0) {
        const baseUrl = window.location.origin + window.location.pathname;
        const queryString = `?size=${keys.join("&")}`;

        window.history.replaceState({}, "", baseUrl + queryString);
      }

      filtered = filtered.filter((item) => keys.includes(item.DogSizeKey));

      console.log(filtered);
      console.log(keys);
    } 

    // console.log(selectedIngredients);
    // console.log(filtered);
    // console.log(filtered);

    // console.log(filtered.filter((item) => item.İngredientsAz === "Mal əti"));

    if (selectedSterilized.length > 0) {
      const keys = selectedSterilized.map((el) => el.key);

      if (keys.length > 0) {
        const baseUrl = window.location.origin + window.location.pathname;
        const queryString = `?isSterilized=${keys.join("&")}`;

        window.history.replaceState({}, "", baseUrl + queryString);
      }

      filtered = filtered.filter((item) => keys.includes(item.İsSterilised));
    }

    //!Stoku yoxlayacam

    if (selectedIsAvailable.length > 0) {
      const keys = selectedIsAvailable.map((el) => el.key);

      if (keys.length > 0) {
        const baseUrl = window.location.origin + window.location.pathname;
        const queryString = `?IsAvailable=${keys.join("&")}`;

        window.history.replaceState({}, "", baseUrl + queryString);
      }

      filtered = filtered.filter((item) => keys.includes(item.InStock));

      console.log(filtered);
      console.log(keys);
    } 

    if (selectedAgeGroups.length > 0) {
      const keys = selectedAgeGroups.map((el) => el.key);

      if (keys.length > 0) {
        const baseUrl = window.location.origin + window.location.pathname;
        const queryString = `?ageGroup=${keys.join("&")}`;

        window.history.replaceState({}, "", baseUrl + queryString);
      } else {
        const baseUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, "", baseUrl);
      }

      filtered = filtered.filter((item) => keys.includes(item.AgeKey));
    }

    if (selectedFoodTypes.length > 0) {
      const keys = selectedFoodTypes.map((el) => el.key);
      if (keys.length > 0) {
        const baseUrl = window.location.origin + window.location.pathname;
        const queryString = `?foodType=${keys.join("&")}`;

        window.history.replaceState({}, "", baseUrl + queryString);
      } else {
        const baseUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, "", baseUrl);
      }

      filtered = filtered.filter((item) => keys.includes(item.FoodTypeKey));
    }

    if (selectedProductType.length > 0) {
      const keys = selectedProductType.map((el) => el.key);
      if (keys.length > 0) {
        const baseUrl = window.location.origin + window.location.pathname;
        const queryString = `?productType=${keys.join("&")}`;

        window.history.replaceState({}, "", baseUrl + queryString);
      } else {
        const baseUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, "", baseUrl);
      }

      filtered = filtered.filter((item) => keys.includes(item.ProductTypeKey));

      console.log(keys);
      console.log(selectedProductType);
    }

    if (selectedAnimalTypes.length > 0) {
      const keys = selectedAnimalTypes.map((el) => el.key);
      if (keys.length > 0) {
        const baseUrl = window.location.origin + window.location.pathname;
        const queryString = `?animal=${keys.join("&")}`;

        window.history.replaceState({}, "", baseUrl + queryString);
      } else {
        const baseUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, "", baseUrl);
      }

      filtered = filtered.filter((item) => keys.includes(item.AnimalKey));
    }

    setFilteredData(filtered);

    // const keys = selectedAnimalTypes.map((el) => el.key);

    // const params = new URLSearchParams(window.location.search);

    // if (keys.length > 0) {

    //   const baseUrl = window.location.origin + window.location.pathname;
    //   const queryString = `?animal=${keys.join("&")}`;

    //   window.history.replaceState({}, "", baseUrl + queryString);
    // } else {
    //   const baseUrl = window.location.origin + window.location.pathname;
    //   window.history.replaceState({}, "", baseUrl);
    // }
  }, [
    selectedBrands,
    selectedSizes,
    selectedIngredients,
    selectedSterilized,
    selectedAgeGroups,
    selectedFoodTypes,
    selectedAnimalTypes,
    selectedVetDiets,
    selectedIsAvailable,
    selectedProductType,
    data,
    i18n.language,
  ]);

  //  selectedBrands

  //&CHECK FOR PRICE RANGE

  const calculateFinalPrice = (product) => {
    if (product.isDiscount && product.Price) {
      return product.Price - (product.Price / 100) * product.PercentOfDiscount;
    }
    return product.Price;
  };

  const determinePricesWithRange = () => {
    return data.filter((item) => {
      const finalPrice = calculateFinalPrice(item);
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });
  };

  determinePricesWithRange();

  //&FILTER FOR RATING 4 AND 5

  const [showFiltered, setShowFiltered] = useState(false);

  const handleToggle = (event) => {
    setShowFiltered(event.target.checked);
  };

  const filteredProducts = showFiltered
    ? data.filter((p) => p.Rating >= 4 && p.Rating <= 5)
    : data;
  console.log(filteredProducts, "RATING");

  useEffect(() => {
    const filtered = determinePricesWithRange();
    setFilteredData(filtered);
  }, [priceRange, data]);

  useEffect(() => {
    // const filtered = handleToggle();
    setFilteredData(filteredProducts);
  }, [showFiltered, data]);

  //^URLE OTURMEK UCUN OLAN HISSE

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

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
          brand,
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
          "pharmacyAppointment.title",
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
        {/* Filtering for price */}

        <div className={styles.filter_list}>
          <p className={styles.price}>Qiymət</p>
          <div className={styles.input_prices}>
            <div className={styles.min_price}>
              {" "}
              <input
                className={styles.price_range_input}
                type="number"
                value={priceRange[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
              ></input>
              <span className={styles.manat_svg}>
                <Manat />
              </span>
            </div>
            <div className={styles.max_price}>
              {" "}
              <input
                className={styles.price_range_input}
                type="number"
                value={priceRange[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
              ></input>
              <span className={styles.manat_svg}>
                <Manat />
              </span>
            </div>
          </div>
          <RangeSlider
            min={0}
            max={maxPrice}
            value={priceRange}
            onChange={setPriceRange}
          />
        </div>
        {/* Filtering for RATING */}
        <div className={styles.rating_desc_box}>
          <div className={styles.rating_left}>
            <p className={styles.price}>{t("ratingForFilterTitle")}</p>
            <span className={styles.rating_text}>
              {t("ratingForFilterText")}
            </span>
          </div>
          <div className={styles.rating_right}>
            <IOSSwitch onChange={handleToggle} />
          </div>
        </div>
      </div>
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
