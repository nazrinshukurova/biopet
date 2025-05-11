import React, { useState } from "react";
import styles from "./FilterCategory.module.css";
import { useTranslation } from "react-i18next";

//& Reusable Filter Component
const FilterSection = ({
  title,
  searchValue,
  setSearchValue,
  items,
  matches,
  placeholderKey,
  onResetSearch,
}) => {
  const { t } = useTranslation();

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
                  className={styles.hidden_checkbox}
                />
                <span className={styles.check_box}></span>
                <span className={styles.label_text}>{item.label}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FilterCategory = () => {
  const { t } = useTranslation();
  const [searchBrand, setSearchBrand] = useState("");
  const [searchAroma, setSearchAroma] = useState("");
  const [searchSize, setSearchSize] = useState("");
  const [searchIll, setSearchIll] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [searchDiets, setSearchDiets] = useState("");
  const [searchFoodType, setSearchFoodType] = useState("");
  const [searchSterilized, setSearchSterilized] = useState("");
  const [searchAnimal, setSearchAnimal] = useState("");

  const createMatches = (searchValue) => (item) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase());

  const handleResetSearch = () => {
    setSearchBrand("");
    setSearchAroma("");
    setSearchSize("");
    setSearchSterilized("");
    setSearchIll("");
    setSearchDiets("");
    setSearchAge("");
    setSearchFoodType("");
    setSearchAnimal("");
  };

  const brands = [
    { value: "royal-canin", label: "Royal Canin" },
    { value: "acana", label: "Acana" },
    { value: "monge", label: "Monge" },
    { value: "pro-plan", label: "Pro Plan" },
    { value: "gemon", label: "Gemon" },
    { value: "topline", label: "TopLine" },
    { value: "darling", label: "Darling" },
    { value: "natures-protection", label: "Nature's Protection" },
    { value: "grandorf", label: "Grandorf" },
    { value: "econature-plus", label: "Econature Plus" },
  ];

  const sizes = [
    { value: "size1", label: t("sizeOfDog.size1") },
    { value: "size2", label: t("sizeOfDog.size2") },
    { value: "size3", label: t("sizeOfDog.size3") },
    { value: "size4", label: t("sizeOfDog.size4") },
  ];

  const sterilized = [
    { value: "true", label: t("bəli") },
    { value: "false", label: t("xeyr") },
  ];

  const sicknesses = [
    { value: "disease_prevention", label: t("sicknesses.disease_prevention") },
    {
      value: "search_disease_prevention",
      label: t("sicknesses.search_disease_prevention"),
    },
    { value: "urinary_system", label: t("sicknesses.urinary_system") },
    { value: "overweight", label: t("sicknesses.overweight") },
    { value: "hairballs_removal", label: t("sicknesses.hairballs_removal") },
    { value: "hair_skin_health", label: t("sicknesses.hair_skin_health") },
    { value: "dental_calculus", label: t("sicknesses.dental_calculus") },
  ];

  const aromas = [
    { value: "ev-qusu", label: t("ingredients.ev_qusu") },
    { value: "mal-eti", label: t("ingredients.mal_eti") },
    { value: "deniz-mehsullari", label: t("ingredients.qizilbaliq") },
    { value: "diger", label: t("ingredients.diger") },
    { value: "dovsan-eti", label: t("ingredients.dovsan_eti") },
    { value: "quzu-eti", label: t("ingredients.quzu_eti") },
    { value: "hind-qusu", label: t("ingredients.hind_qusu") },
    { value: "ordek", label: t("ingredients.ordek") },
    { value: "sardina", label: t("ingredients.sardina") },
    { value: "xek", label: t("ingredients.xek") },
    { value: "qus-eti", label: t("ingredients.qus_eti") },
    { value: "baliq", label: t("ingredients.baliq") },
    { value: "maral-eti", label: t("ingredients.maral_eti") },
    { value: "duyu", label: t("ingredients.duyu") },
    { value: "yumurta", label: t("ingredients.yumurta") },
    { value: "siyenek", label: t("ingredients.siyenek") },
    { value: "kambala", label: t("ingredients.kambala") },
    { value: "bizon", label: t("ingredients.bizon") },
  ];

  const vetDiets = [
    { value: "hezm-saglamligi", label: t("vetDiets.hezm_saglamligi") },
    {
      value: "deri-ve-tuk-saglamligi",
      label: t("vetDiets.deri_ve_tuk_saglamligi"),
    },
    {
      value: "artiq-cekinin-profilaktikasi",
      label: t("vetDiets.artiq_cekinin_profilaktikasi"),
    },
    {
      value: "sidik-ifrazat-sistemi",
      label: t("vetDiets.sidik_dasi_xesteliyi"),
    },
    { value: "berpa-dovru", label: t("vetDiets.berpa_dovru") },
    { value: "hipoallergik", label: t("vetDiets.hipoallergik") },
    { value: "boyrek-xesteliyi", label: t("vetDiets.boyrek_xesteliyi") },
    {
      value: "qaraciyer-xesteliyi",
      label: t("vetDiets.qaraciyer_catismamazligi"),
    },
    { value: "qebizliye-qarsi", label: t("vetDiets.qebizliye_qarsi") },
  ];

  const ageGroups = [
    { value: "yeni-dogulmus", label: t("ageGroups.yeni_dogulmus") },
    { value: "anadan-ayrilmis", label: t("ageGroups.anadan_ayrilmis") },
    { value: "yetkin", label: t("ageGroups.yetkin") },
    { value: "yasli", label: t("ageGroups.yasli") },
  ];

  const foodTypes = [
    { value: "quru", label: t("foodTypes.quru") },
    { value: "nem-pauc", label: t("foodTypes.nem_pauc") },
    { value: "yas", label: t("foodTypes.yas") },
  ];

  const animalTypes = [
    { value: "it", label: t("animalTypes.it") },
    { value: "pisik", label: t("animalTypes.pisik") },
    { value: "gemirici", label: t("animalTypes.gemirici") },
    { value: "dovsan", label: t("animalTypes.dovsan") },
    { value: "qus", label: t("animalTypes.qus") },
    { value: "dagsican", label: t("animalTypes.dagsican") },
    { value: "deniz-donuzu", label: t("animalTypes.deniz_donuzu") },
  ];

  const fetchCats = async () => {
    try {
      let { data: Cats, error } = await supabase.from("Cats").select("*");

      if (error) {
        throw error;
      }

      console.log(Cats);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  fetchCats();

  return (
    <div>
      <div className={styles.left_filter}>
        <div className={styles.filter_list}>
          <span className={styles.category_title}>
            {t("relatedCategories.title")}:{" "}
          </span>
          <div className={styles.category}>
            {t("relatedCategories.Quru_yem")}
          </div>
          <div className={styles.category}>
            {t("relatedCategories.Nəm_yem")}
          </div>
          <div className={styles.category}>
            {t("relatedCategories.Bala_itlər_üçün")}
          </div>
          <div className={styles.category}>
            {t("relatedCategories.Hamilə_və_südverən_itlər_üçün")}
          </div>
          <div className={styles.category}>
            {t("relatedCategories.Müalicəvi_yemlər")}
          </div>
        </div>

        <FilterSection
          title="animalTypes.title"
          searchValue={searchAnimal}
          setSearchValue={setSearchAnimal}
          items={animalTypes}
          matches={createMatches(searchAnimal)}
          placeholderKey="search_placeholders_0"
          onResetSearch={handleResetSearch}
        />

        <FilterSection
          title="brend"
          searchValue={searchBrand}
          setSearchValue={setSearchBrand}
          items={brands}
          matches={createMatches(searchBrand)}
          placeholderKey="search_placeholders_1"
          onResetSearch={handleResetSearch}
        />
        <FilterSection
          title="aroma.title"
          searchValue={searchAroma}
          setSearchValue={setSearchAroma}
          items={aromas}
          matches={createMatches(searchAroma)}
          placeholderKey="search_placeholders_2"
          onResetSearch={handleResetSearch}
        />
        <FilterSection
          title="sizeOfDog.title"
          searchValue={searchSize}
          setSearchValue={setSearchSize}
          items={sizes}
          matches={createMatches(searchSize)}
          placeholderKey="search_placeholders_3"
          onResetSearch={handleResetSearch}
        />
        <FilterSection
          title="sterilized"
          searchValue={searchSterilized}
          setSearchValue={setSearchSterilized}
          items={sterilized}
          matches={createMatches(searchSterilized)}
          placeholderKey="search_placeholders_4"
          onResetSearch={handleResetSearch}
        />
        <FilterSection
          title="sicknesses.title"
          searchValue={searchIll}
          setSearchValue={setSearchIll}
          items={sicknesses}
          matches={createMatches(searchIll)}
          placeholderKey="search_placeholders_5"
          onResetSearch={handleResetSearch}
        />
        <FilterSection
          title="vetDiets.title"
          searchValue={searchDiets}
          setSearchValue={setSearchDiets}
          items={vetDiets}
          matches={createMatches(searchDiets)}
          placeholderKey="search_placeholders_6"
          onResetSearch={handleResetSearch}
        />
        <FilterSection
          title="ageGroups.title"
          searchValue={searchAge}
          setSearchValue={setSearchAge}
          items={ageGroups}
          matches={createMatches(searchAge)}
          placeholderKey="search_placeholders_7"
          onResetSearch={handleResetSearch}
        />
        <FilterSection
          title="foodTypes.title"
          searchValue={searchFoodType}
          setSearchValue={setSearchFoodType}
          items={foodTypes}
          matches={createMatches(searchFoodType)}
          placeholderKey="search_placeholders_8"
          onResetSearch={handleResetSearch}
        />
      </div>
    </div>
  );
};

export default FilterCategory;
