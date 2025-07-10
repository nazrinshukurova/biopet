import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import { useTranslation } from "react-i18next";
import { HiOutlineTruck } from "react-icons/hi";
import { PiTagChevron } from "react-icons/pi";
import {
  Card,
  Checked,
  Dashed,
  Gift,
  Location,
  Money,
  Percent,
} from "../../assets/icons/Svg.jsx";
import { useBasket } from "../../context/AddToBasket";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { FinishTheOrder, SaveMemory } from "../../shared/Buttons/Buttons";
import { SuccesAlert } from "../../shared/ReusableItems/Reusable";
import birbank from "../../assets/Brands/birbank.png";
import { Link } from "react-router-dom";
import { supabase } from "../../../client.js";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.display_name || "";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "";
  }
};

const LocationMarker = ({ setSelectedAddress }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      const address = await getAddressFromCoordinates(lat, lng);
      setSelectedAddress(address);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Seçdiyin ünvan</Popup>
    </Marker>
  );
};

const CheckoutComp = () => {
  const { t, i18n } = useTranslation();
  const { totalPrice, totalDiscount } = useBasket();

  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [discountFromPromo, setDiscountFromPromo] = useState(0);

  const handleApplyPromo = async () => {
    setPromoError("");
    let { data, error } = await supabase
      .from("Promocode")
      .select("*")
      .eq("name", promoCode.trim())
      .maybeSingle();

    if (error || !data) {
      setPromoError(t("invalid_promocode"));
      setPromoApplied(false);
      setDiscountFromPromo(0);
      return;
    }

    const { percent } = data;

    let calculatedDiscount = 0;

    calculatedDiscount = (totalPrice / 100) * percent;

    setDiscountFromPromo(calculatedDiscount);
    setPromoApplied(true);
  };

  const [selectedAddress, setSelectedAddress] = useState("");
  const [formData, setFormData] = useState({
    addressTitle: "",
    homeNumber: "",
    city: "",
    district: "",
    street: "",
    note: "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleSelectInstallment = (installment) => {
    setSelectedInstallment(installment);
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("checkoutForm"));
    if (savedData) {
      setSelectedAddress(savedData.selectedAddress || "");
      setFormData(
        savedData.formData || {
          addressTitle: "",
          homeNumber: "",
          city: "",
          district: "",
          street: "",
          note: "",
        }
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    try {
      const dataToSave = { selectedAddress, formData };
      localStorage.setItem("checkoutForm", JSON.stringify(dataToSave));

      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 700);
    } catch (error) {
      alert(
        i18n.language === "az" ? "Yadda saxlanılmadı!" : "Данные не сохранены!"
      );
    }
  };

  return (
    <div className={styles.payment}>
      <div className={styles.payment_section}>
        {showSuccessAlert && (
          <SuccesAlert
            text={
              i18n.language === "az"
                ? "Məlumatlar yadda saxlanıldı"
                : "Данные сохранены"
            }
          />
        )}

        <div className={styles.section_title}>
          {i18n.language === "az" ? "Ödəmə" : "Оплата"}
        </div>

        <div className={styles.payment_container}>
          <div>
            {i18n.language === "az"
              ? "1. Çatdırılma ünvanı"
              : "1. Адрес доставки"}
          </div>

          <div className={styles.delivery_condition}>
            {t("delivery_condition")}
          </div>

          <div className={styles.delivery_type}>
            {i18n.language === "az" ? "Çatdırılma üsulu" : "Способ доставки"}
          </div>

          <div className={styles.delivery_type_text}>
            <p>
              {i18n.language === "az"
                ? "Kuryer ilə ünvana çatdırılma"
                : "Доставка по адресу курьером"}
            </p>
            <Checked />
          </div>

          <div className={styles.address}>
            <div className={styles.address_and_input}>
              <p>
                {i18n.language === "az" ? "Ünvan başlığı" : "Название адреса"}
              </p>
              <input
                className={styles.address_input}
                name="addressTitle"
                value={formData.addressTitle}
                onChange={handleInputChange}
                placeholder={
                  i18n.language === "az"
                    ? "Ünvan başlığı daxil edin"
                    : "Введите название адреса"
                }
              />
            </div>

            <div className={styles.address_and_input}>
              <p>
                {i18n.language === "az"
                  ? "Ev nömrəsi/Blok/Mənzil/Mərtəbə"
                  : "Номер дома/блока/квартиры/этажа"}
              </p>
              <input
                className={styles.address_input}
                name="homeNumber"
                value={formData.homeNumber}
                onChange={handleInputChange}
                placeholder={
                  i18n.language === "az"
                    ? "Məsələn: 12A, Blok 5"
                    : "Например: 12A, Блок 5"
                }
              />
            </div>

            <div className={styles.address_and_input}>
              <p>{i18n.language === "az" ? "Şəhər" : "Город"}</p>
              <input
                className={styles.address_input}
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder={
                  i18n.language === "az" ? "Şəhər daxil edin" : "Введите город"
                }
              />
            </div>

            <div className={styles.address_and_input}>
              <p>{i18n.language === "az" ? "Rayon" : "Округ"}</p>
              <input
                className={styles.address_input}
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder={
                  i18n.language === "az" ? "Rayon daxil edin" : "Введите округ"
                }
              />
            </div>

            <div className={styles.address_and_input}>
              <p>{i18n.language === "az" ? "Küçə" : "Улица"}</p>
              <input
                className={styles.address_input}
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder={
                  i18n.language === "az" ? "Küçə daxil edin" : "Введите улицу"
                }
              />
            </div>

            <div className={styles.address_and_input}>
              <p>
                {i18n.language === "az"
                  ? "Xəritədən seçilən ünvan"
                  : "Адрес, выбранный на карте"}
              </p>
              <input
                className={styles.address_input}
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                placeholder={
                  i18n.language === "az"
                    ? "Xəritədən ünvan seçin və ya daxil edin"
                    : "Выберите или введите адрес с карты"
                }
              />
            </div>
          </div>

          <div className={styles.map_container}>
            <div className={styles.map_title}>
              <div>
                <Location />
              </div>
              <div>
                {i18n.language === "az"
                  ? "Ünvanı xəritədə seç"
                  : "Выберите адрес на карте"}
              </div>
            </div>

            <MapContainer
              center={[40.4093, 49.8671]}
              zoom={13}
              style={{ height: "400px", width: "100%", marginTop: "10px" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker setSelectedAddress={setSelectedAddress} />
            </MapContainer>
          </div>

          <div className={styles.address_and_input}>
            <p>
              {i18n.language === "az"
                ? "Kuryer üçün əlavə qeyd"
                : "Дополнительное примечание для курьера"}
            </p>
            <input
              className={styles.address_input}
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              placeholder={
                i18n.language === "az"
                  ? "Qeyd əlavə edin"
                  : "Добавьте примечание"
              }
            />
          </div>

          <div onClick={handleSave} style={{ cursor: "pointer" }}>
            <SaveMemory />
          </div>

          <div>
            <div className={styles.payment_head}>
              {i18n.language === "az" ? "2. Ödəmə metodu" : "2. Способ оплаты"}
            </div>

            <div className={styles.payment_methods_box}>
              <div
                className={`${styles.payment_method} ${
                  selectedMethod === "cash" ? styles.selected : ""
                }`}
                onClick={() => handleSelect("cash")}
              >
                <Money />
                <div className={styles.payment_text}>
                  {i18n.language === "az"
                    ? "Çatdırıldıqda kuryerə ödə"
                    : "Оплата курьеру при доставке."}
                </div>
              </div>

              <div
                className={`${styles.payment_method} ${
                  selectedMethod === "card" ? styles.selected : ""
                }`}
                onClick={() => handleSelect("card")}
              >
                <Card />
                <div className={styles.payment_text}>
                  {i18n.language === "az" ? "Onlayn ödə" : "Оплата онлайн"}
                </div>
              </div>

              <div
                className={`${styles.payment_method} ${
                  selectedMethod === "installment" ? styles.selected : ""
                }`}
                onClick={() => handleSelect("installment")}
              >
                <Percent />
                <div className={styles.payment_text}>
                  {i18n.language === "az"
                    ? "Taksit ilə ödə"
                    : "Оплата в рассрочку"}
                </div>
              </div>
            </div>

            {selectedMethod === "installment" && (
              <div className={styles.payment_with_taksit}>
                <div
                  className={`${styles.birbank_container} ${
                    selectedInstallment === "3months" ? styles.selected : ""
                  }`}
                  onClick={() => handleSelectInstallment("3months")}
                >
                  <img className={styles.birbank} src={birbank} alt="birbank" />
                  <div>{t("birbank_3_taksit")}</div>
                </div>

                <div
                  className={`${styles.birbank_container} ${
                    selectedInstallment === "2months" ? styles.selected : ""
                  }`}
                  onClick={() => handleSelectInstallment("2months")}
                >
                  <img className={styles.birbank} src={birbank} alt="birbank" />
                  <div>{t("birbank_2_taksit")}</div>
                </div>
              </div>
            )}

            <Link to="/payment" style={{ textDecoration: "none" }}>
              <div className={styles.payment_button}>
                <FinishTheOrder
                  disabled={!selectedMethod} // burada yoxlayırsan
                  text={
                    i18n.language === "az"
                      ? "Ödənişi təsdiqlə"
                      : "Подтвердить платеж"
                  }
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.basket_right}>
        <div className={styles.order_title}>
          <div>{t("order_title")}</div>
          <HiOutlineTruck
            style={{ height: "20px", width: "20px", color: "#e21e4c" }}
          />
        </div>

        <div className={styles.order_total}>
          <div>{t("total_price")}</div>
          <div>{totalPrice.toFixed(2)} man</div>
        </div>

        <Dashed style={{ margin: "24px 0 28px", paddingBottom: "32px" }} />

        <div className={styles.order_total}>
          <div>{t("total_discount")}</div>
          <div>-{(totalDiscount + discountFromPromo).toFixed(2)} man</div>
        </div>

        <Dashed style={{ margin: "24px 0 28px", paddingBottom: "32px" }} />

        <div className={styles.order_total}>
          <div>{t("total_bonus")}</div>
          <div className={styles.bonus_gift}>
            +{totalPrice.toFixed()} <Gift />
          </div>
        </div>

        <Dashed style={{ margin: "24px 28px", paddingBottom: "32px" }} />

        <div className={styles.order_total}>
          <div>{t("total")}</div>
          <div>
            {" "}
            {(totalPrice - totalDiscount - discountFromPromo).toFixed(2)} man
          </div>
        </div>

        <Dashed style={{ margin: "24px 28px", paddingBottom: "32px" }} />
        <div className={styles.promocode_wrapper}>
          {!showPromoInput ? (
            <div
              onClick={() => setShowPromoInput(true)}
              className={styles.promocode_link}
            >
              <PiTagChevron style={{ marginRight: 6 }} />
              {t("have_promocode")}
            </div>
          ) : (
            <div className={styles.promocode_input_area}>
              <input
                type="text"
                placeholder={t("enter_promocode")}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className={styles.promocode_input}
              />
              <button
                onClick={handleApplyPromo}
                className={styles.promocode_button}
              >
                {t("apply")}
              </button>
              {promoError && (
                <div className={styles.promo_error}>{promoError}</div>
              )}
              {promoApplied && (
                <div className={styles.promo_success}>
                  {t("discount_applied")}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.delivery_policy}>{t("delivery_policy")}</div>
      </div>
    </div>
  );
};

export default CheckoutComp;
