import { t } from "i18next";
import { Check, Date, Gift, Paw, View } from "../../assets/icons/Svg.jsx";
import styles from "./Reusable.module.css";
import { useTranslation } from "react-i18next";
import image2 from "../../../public/categoriesİtem/heyvan-yetisdiren-satan-biopet-sablon-removebg-preview.png";

export const Blog = ({ src, title, date, view }) => {
  return (
    <div className={styles.blog_container}>
      <div>
        <img className={styles.blog_img} src={src}></img>
      </div>
      <div className={styles.blog_desc}>
        {" "}
        <div className={styles.title}>{title}</div>
        <div className={styles.date_and_view}>
          <div className={styles.view}>
            <Date />
            <div>{date}</div>
          </div>
          <div className={styles.view}>
            {" "}
            <View />
            <div>{view}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SuccesAlert = ({ text }) => {
  const { i18n, t } = useTranslation();

  return (
    <>
      <div className={styles.overlay}>
        {" "}
        <div className={styles.alert_box}>
          {text}
          <Check />
        </div>
      </div>
    </>
  );
};

export const BonusPopUp = ({ bonus }) => {
  return (
    <>
      <div className={styles.overlay}>
        {" "}
        <div className={styles.overlay2}>
          {" "}
          <div className={styles.bonus_popup}>
            <img style={{ width: "100px", height: "100px" }} src={image2}></img>
            <div className={styles.paw_and_text}>
              <p>
                Siz {bonus} <Gift /> bonus qazandınız
              </p>{" "}
              <Paw />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
