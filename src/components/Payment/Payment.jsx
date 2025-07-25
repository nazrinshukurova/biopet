import React, { useState, useEffect } from "react";
import styles from "./Payment.module.css";
import image1 from "../../../public/categoriesİtem/HppImage-Banner-Flex.png";
import image2 from "../../../public/categoriesİtem/HppImage-Logo-Flex.png";
import { useTranslation } from "react-i18next";
import { useBasket } from "../../context/AddToBasket";
import { PayButton } from "../../shared/Buttons/Buttons";
import { BonusPopUp, SuccesAlert } from "../../shared/ReusableItems/Reusable";
import visa from "../../../public/categoriesİtem/visa.png";
import idCheck from "../../../public/categoriesİtem/idcheck.png";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const Payment = () => {
  const { t } = useTranslation();
  const { totalPrice, totalDiscount } = useBasket();
  const amount = (totalPrice - totalDiscount).toFixed(2);
  const [showAlert, setShowAlert] = useState(false);
  const [showBonusPopup, setShowBonusPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { cardNumber: "", expiry: "", cvv: "" };

    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Kart nömrəsi 16 rəqəm olmalıdır";
      valid = false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Format düzgün deyil. Məsələn: 05/25";
      valid = false;
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "CVV 3 rəqəm olmalıdır";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);

        setShowBonusPopup(true);
        setShowConfetti(true);

        // 2.5 saniyədən sonra yönləndir və confetti-ni bağla
        setTimeout(() => {
          setShowBonusPopup(false);
          setShowConfetti(false);
          window.location.href = "/";
        }, 4500);
      }, 900);

      // Formu sıfırla
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setErrors({ cardNumber: "", expiry: "", cvv: "" });
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value;

    if (value.length === 2 && expiry.length === 1) {
      value = value + "/";
    }

    if (/^[0-9\/]*$/.test(value) && value.length <= 5) {
      setExpiry(value);
    }
  };

  const handleCvvChange = (e) => {
    let value = e.target.value;

    if (/^[0-9]*$/.test(value) && value.length <= 3) {
      setCvv(value);
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Yalnız rəqəmləri saxla
    let formattedValue = value.match(/.{1,4}/g)?.join(" ") || ""; // 4 rəqəmdən bir boşluq qoy

    if (formattedValue.length <= 19) {
      setCardNumber(formattedValue);
    }
  };

  const handleReject = () => {
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setErrors({ cardNumber: "", expiry: "", cvv: "" });
  };

  return (
    <div >
      {showConfetti && <Confetti width={width} height={height} />}
      <form onSubmit={handleSubmit} className={styles.payment_container}>
        {showAlert && <SuccesAlert text={t("succes_message_about_payment")} />}
        {showBonusPopup && <BonusPopUp bonus={totalPrice.toFixed()} />}

        <div className={styles.left}>
          <div className={styles.left_side}>
            <div className={styles.logo_section}>
              <img className={styles.logo} src={image2} alt="Logo" />
            </div>

            <div className={styles.payment_section}>
              {t("enter_kart_details")}
            </div>

            <div className={styles.input_group}>
              <input
                className={styles.field_input}
                placeholder="Kart Nömrəsi"
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(e.target.value);
                  handleCardNumberChange(e);
                }}
              />
              {errors.cardNumber && (
                <span className={styles.error}>{errors.cardNumber}</span>
              )}
            </div>

            <div className={styles.cvv_and_year}>
              <div className={styles.input_group}>
                <input
                  className={styles.year_and_month}
                  placeholder="AY/İL"
                  value={expiry}
                  onChange={handleExpiryChange}
                  maxLength={5}
                  title="Zəhmət olmasa format: MM/YY (məs: 05/25)"
                />
                {errors.expiry && (
                  <span className={styles.error}>{errors.expiry}</span>
                )}
              </div>

              <div className={styles.input_group}>
                <input
                  className={styles.year_and_month}
                  placeholder="CVV2"
                  value={cvv}
                  onChange={handleCvvChange}
                  maxLength={3}
                  title="Zəhmət olmasa 3 rəqəmli CVV kodunu daxil edin"
                />
                {errors.cvv && (
                  <span className={styles.error}>{errors.cvv}</span>
                )}
              </div>
            </div>

            <div className={styles.payment_title}>{t("payment_details")}</div>
            <div className={styles.payment_amount}>{t("payment_amount")}</div>
            <div>{amount} AZN</div>

            <PayButton
              textColor="#fff"
              color="#DF3A4C"
              text={t("pay")}
              type="submit"
            />

            <PayButton
              textColor="#586268"
              color="#F3F5F8"
              text={t("reject")}
              onClick={handleReject}
              type="button"
            />

            <div className={styles.cart_types}>
              <img style={{ height: "38px",width:"59px"  }} src={idCheck} alt="id check" />
              <img style={{ height: "38px",width:"69px" }} src={visa} alt="visa" />
            </div>
          </div>
        </div>

        <div className={styles.right_side}>
          <img className={styles.image1} src={image1} alt="Payment Banner" />
        </div>
      </form>
    </div>
  );
};

export default Payment;
