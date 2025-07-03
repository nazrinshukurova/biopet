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
import {
  EmptyStarSvg,
  ExternalLink,
  FilterSvg,
  FullFilledStarSvg,
  Heart,
  Manat,
  Wish,
  Wished,
} from "../../assets/Svg";
import RangeSlider from "../../assets/sliders/RangeSlider";
import IOSSwitch from "../../assets/sliders/Toggle";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SortSelect from "../../shared/Selects/Select";
import AddToCart from "../../shared/Buttons/Buttons";
import Footer from "../../shared/Footer/Footer";
import { FaArrowAltCircleUp, FaArrowCircleUp, FaArrowUp } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { FiExternalLink } from "react-icons/fi";
import { SuccesAlert } from "../../shared/ReusableItems/Reusable";
import { useBasket } from "../../context/AddToBasket";

const FilterCategory = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { addToBasket, showSuccessAlert } = useBasket();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const [isLoadingSizes, setIsLoadingSizes] = useState(true);
  const [isLoadingSterilized, setIsLoadingSterilized] = useState(true);
  const [isLoadingIsAvailable, setIsLoadingIsAvailable] = useState(true);
  const [isLoadingAgeGroups, setIsLoadingAgeGroups] = useState(true);
  const [isLoadingFoodTypes, setIsLoadingFoodTypes] = useState(true);
  const [isLoadingAnimalTypes, setIsLoadingAnimalTypes] = useState(true);
  const [isLoadingVetDiets, setIsLoadingVetDiets] = useState(true);
  const [isLoadingProductTypes, setIsLoadingProductTypes] = useState(true);

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

  const createMatches = (searchValue) => (item) => {
    //? console.log(searchValue,'SEARCH EDIREM')
    //? console.log(item.value.valueAz)
    return i18n.language === "ru"
      ? item?.value.valueRu.toLowerCase().includes(searchValue?.toLowerCase())
      : item?.value.valueAz.toLowerCase().includes(searchValue?.toLowerCase());
  };

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
    setSelectedState,
    loading
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
      loading={loading}
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
      setLoading(false);
      setIsLoadingBrands(false);
      setIsLoadingIngredients(false);
      setIsLoadingSizes(false);
      setIsLoadingSterilized(false);
      setIsLoadingIsAvailable(false);
      setIsLoadingAgeGroups(false);
      setIsLoadingFoodTypes(false);
      setIsLoadingAnimalTypes(false);
      setIsLoadingVetDiets(false);
      setIsLoadingProductTypes(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = data;

    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();

    const applyFilter = (selected, keyName, itemField, commentLabel = "") => {
      if (selected.length > 0) {
        const keys = selected.map((el) => el.key);

        if (keys.length > 0) {
          params.set(keyName, keys.join("&"));
        }

        console.log(keys);

        console.log(params);

        filtered = filtered.filter((item) => keys.includes(item[itemField]));
        console.log(filtered);

        // Optional: Debugging logs
        if (commentLabel) {
          console.log(`${commentLabel} filtered:`, filtered);
          console.log(`${commentLabel} keys:`, keys);
        }
      }
    };

    applyFilter(selectedBrands, "brand", "BrandKey", "Brand");
    applyFilter(selectedIngredients, "ingedient", "IngredientsKey");
    applyFilter(selectedVetDiets, "animal", "PharmacyAppointmentKey");
    applyFilter(selectedSizes, "size", "DogSizeKey", "Size");
    applyFilter(selectedSterilized, "isSterilized", "İsSterilised");
    //!Stoku yoxlayacam
    applyFilter(selectedIsAvailable, "IsAvailable", "InStock", "Stok");
    applyFilter(selectedAgeGroups, "ageGroup", "AgeKey");
    applyFilter(selectedFoodTypes, "foodType", "FoodTypeKey");
    applyFilter(
      selectedProductType,
      "productType",
      "ProductTypeKey",
      "Product Type"
    );
    applyFilter(selectedAnimalTypes, "animal", "AnimalKey");

    // Update URL
    const queryString = params.toString();
    window.history.replaceState(
      {},
      "",
      queryString ? `${baseUrl}?${queryString}` : baseUrl
    );

    setFilteredData(filtered);
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

  //^Pagenetion

  const [searchParams, setSearchParams] = useSearchParams();

  // URL-dən oxu
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("search") || "";
  const itemsPerPage = 16;

  // Səhifələmə
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Search handler
  const handleSearch = (e) => {
    setSearchParams({ page: 1, search: e.target.value }); // URL dəyişir, səhifə sıfırlanır
  };

  // Page change handler
  const handlePageChange = (page) => {
    setSearchParams({ page, search: searchTerm });
  };

  console.log(searchParams, "SEARCH PARAMS");

  const {
    addToWishlist,
    wishlist,
    clearWishlist,
    isInWishlist,
    loadingWishlistId,
  } = useWishlist();

  console.log(wishlist, "WISHLIST");

  console.log(isInWishlist(), "WISLISTDE VARSA YOXLA");

  // Add this useEffect to your FilterCategory component
  // Add it after your existing useEffects

  useEffect(() => {
    // Close filter when clicking outside on mobile
    const handleClickOutside = (event) => {
      if (
        isMobileFilterOpen &&
        !event.target.closest(`.${styles.left_filter}`) &&
        !event.target.closest(`.${styles.mobile_filter_button}`)
      ) {
        setIsMobileFilterOpen(false);
      }
    };

    // Prevent body scroll when filter is open
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("click", handleClickOutside);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileFilterOpen]);

  // Also add this function to handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isMobileFilterOpen) {
        setIsMobileFilterOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileFilterOpen]);

  const handleResetAllFilters = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedIngredients([]);
    setSelectedSterilized([]);
    setSelectedIsAvailable([]);
    setSelectedAgeGroups([]);
    setSelectedFoodTypes([]);
    setSelectedAnimalTypes([]);
    setSelectedVetDiets([]);
    setSelectedProductType([]);
    setPriceRange([0, maxPrice]);
    setShowFiltered(false);
    handleResetSearch();
  };

  return (
    <>
      <div className={styles.common_container}>
        {showSuccessAlert && (
          <SuccesAlert
            text={
              i18n.language === "az"
                ? "Məhsul səbətə əlavə olundu"
                : "Товар добавлен в корзину"
            }
          />
        )}{" "}
        <div
          className={`${styles.left_filter} ${
            isMobileFilterOpen ? styles.mobile_open : ""
          }`}
        >
          <button
            className={styles.close_mobile_filter}
            onClick={() => setIsMobileFilterOpen(false)}
          >
            ✕
          </button>
          <div className={styles.filter_list}>
            <span className={styles.category_title}>
              {loading ? (
                <div
                  className={styles.skeleton}
                  style={{ width: 120, height: 24 }}
                />
              ) : (
                t("relatedCategories.title") + ":"
              )}
            </span>

            {(loading
              ? Array.from({ length: 5 }) // skeleton üçün 5 boş blok
              : [
                  "Quru_yem",
                  "Nəm_yem",
                  "Bala_itlər_üçün",
                  "Hamilə_və_südverən_itlər_üçün",
                  "Müalicəvi_yemlər",
                ]
            ).map((cat, index) => (
              <div key={loading ? index : cat} className={styles.category}>
                {loading ? (
                  <div
                    className={styles.skeleton}
                    style={{ width: "80%", height: 20, margin: "8px 0" }}
                  />
                ) : (
                  t(`relatedCategories.${cat}`)
                )}
              </div>
            ))}
          </div>

          {renderFilter(
            "animalTypes.title",
            "animal",
            animalTypes,
            "search_placeholders_0",
            selectedAnimalTypes,
            setSelectedAnimalTypes,
            isLoadingAnimalTypes
          )}
          {renderFilter(
            "brend",
            "brand",
            brand,
            "search_placeholders_1",
            selectedBrands,
            setSelectedBrands,
            isLoadingBrands
          )}
          {renderFilter(
            "ingredients.title",
            "ingredients",
            ingredients,
            "search_placeholders_2",
            selectedIngredients,
            setSelectedIngredients,
            isLoadingIngredients
          )}
          {renderFilter(
            "isAvailable",
            "isAvailable",
            available,
            "search_placeholders_9",
            selectedIsAvailable,
            setSelectedIsAvailable,
            isLoadingIsAvailable
          )}
          {renderFilter(
            "sizeOfDog.title",
            "size",
            sizes,
            "search_placeholders_3",
            selectedSizes,
            setSelectedSizes,
            isLoadingSizes
          )}
          {renderFilter(
            "sterilized",
            "sterilized",
            sterilized,
            "search_placeholders_4",
            selectedSterilized,
            setSelectedSterilized,
            isLoadingSterilized
          )}

          {renderFilter(
            "pharmacyAppointment.title",
            "diets",
            vetDiets,
            "search_placeholders_6",
            selectedVetDiets,
            setSelectedVetDiets,
            isLoadingVetDiets
          )}
          {renderFilter(
            "ageGroups.title",
            "age",
            ageGroups,
            "search_placeholders_7",
            selectedAgeGroups,
            setSelectedAgeGroups,
            isLoadingAgeGroups
          )}
          {renderFilter(
            "foodTypes.title",
            "foodType",
            foodTypes,
            "search_placeholders_8",
            selectedFoodTypes,
            setSelectedFoodTypes,
            isLoadingFoodTypes
          )}
          {renderFilter(
            "productTypes.title",
            "productType",
            productTypes,
            "search_placeholders_8",
            selectedProductType,
            setSelectedProductType,
            isLoadingProductTypes
          )}
          {/* Filtering for price */}

          <div className={styles.filter_list}>
            {loading ? (
              <>
                <div
                  className={styles.skeleton}
                  style={{ width: 50, height: 20, marginBottom: 12 }}
                />
                <div
                  className={styles.input_prices}
                  style={{ display: "flex", gap: 8 }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      className={styles.skeleton}
                      style={{ height: 36, width: "100%" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      className={styles.skeleton}
                      style={{ height: 36, width: "100%" }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <div
                    className={styles.skeleton}
                    style={{ height: 24, width: "100%" }}
                  />
                </div>
              </>
            ) : (
              <>
                <p className={styles.price}>Qiymət</p>
                <div className={styles.input_prices}>
                  <div className={styles.min_price}>
                    <input
                      className={styles.price_range_input}
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => handleInputChange(0, e.target.value)}
                    />
                    <span className={styles.manat_svg}>
                      <Manat />
                    </span>
                  </div>
                  <div className={styles.max_price}>
                    <input
                      className={styles.price_range_input}
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => handleInputChange(1, e.target.value)}
                    />
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
              </>
            )}
          </div>
          {/* Filtering for RATING */}
          <div className={styles.rating_desc_box}>
            {loading ? (
              <>
                <div className={styles.rating_left}>
                  <div
                    className={styles.skeleton}
                    style={{ width: 100, height: 24, marginBottom: 4 }}
                  />
                  <div
                    className={styles.skeleton}
                    style={{ width: 150, height: 16 }}
                  />
                </div>
                <div className={styles.rating_right}>
                  <div
                    className={styles.skeleton}
                    style={{ width: 40, height: 24, borderRadius: 12 }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.rating_left}>
                  <p className={styles.price}>{t("ratingForFilterTitle")}</p>
                  <span className={styles.rating_text}>
                    {t("ratingForFilterText")}
                  </span>
                </div>
                <div className={styles.rating_right}>
                  <IOSSwitch onChange={handleToggle} />
                </div>
              </>
            )}
          </div>
          <div className={styles.reset_button_container}>
            <button
              className={styles.reset_button}
              onClick={handleResetAllFilters}
            >
              {i18n.language === "az"
                ? "Filtrləri sıfırla"
                : "Сбросить фильтры"}
            </button>
          </div>
        </div>
        <div className={styles.select_and_result}>
          <div className={styles.select_sort_options}>
            <SortSelect products={filteredData} onSorted={setFilteredData} />
            <div classname={styles.filters_button_box}>
              {" "}
              <div
                className={styles.mobile_filter_button}
                onClick={() => setIsMobileFilterOpen(true)}
              >
                <FilterSvg />
              </div>
            </div>
          </div>{" "}
          <div className={styles.filtered_result}>
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.filtered_item}>
                  {/* Skeleton loading */}
                </div>
              ))
            ) : filteredData.length === 0 ? (
              <div className={styles.empty_message_box}>
                <p className={styles.empty_message}>
                  {i18n.language === "az"
                    ? "Nəticə tapılmadı"
                    : "Ничего не найдено"}
                </p>
              </div>
            ) : (
              currentItems.map((item) => (
                <div key={item.id} className={styles.filtered_item}>
                  <div
                    className={styles.item_image}
                    style={{ position: "relative" }}
                  >
                    {item.isDiscount && (
                      <div
                        className={styles.discount_box}
                        style={{
                          position: "absolute",
                          left: "10px",
                          top: "10px",
                        }}
                      >
                        -{item.PercentOfDiscount}%
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                      }}
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => addToWishlist(item)}
                      >
                        {isInWishlist(item.id) ? <Wished /> : <Wish />}
                      </div>
                    </div>

                    <img
                      height="172px"
                      width="172px"
                      src={item.İmage}
                      alt={item.NameAz}
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                  <div className={styles.item_desc}>
                    <div className={styles.priceForFilter}>
                      {item.Price} AZN
                    </div>

                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/product/${item.id}`}
                    >
                      {" "}
                      <div className={styles.item_title}>
                        {" "}
                        {i18n.language === "az" ? item.NameAz : item.NameRu}
                      </div>
                    </Link>

                    <div className={styles.rating}>
                      {item?.Rating === 0 ? (
                        <EmptyStarSvg />
                      ) : (
                        <FullFilledStarSvg />
                      )}{" "}
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

                  <AddToCart onClick={() => addToBasket(item)} />
                </div>
              ))
            )}
          </div>
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`${styles.page_button} ${
                  currentPage === i + 1 ? styles.active : ""
                }`}
                onClick={() => handlePageChange(i + 1)} // Düzgün handler
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className={styles.go_to_top}>
            {" "}
            <button
              className={styles.up_button}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <FaArrowUp style={{ fontWeight: "400px" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterCategory;
