import React from "react";
import styles from "./Contact.module.css";
import { useTranslation } from "react-i18next";

const ContactComp = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.contact_wrapper}>
      <h1 className={styles.section_title}>
        {i18n.language === "az" ? "Bizimlə əlaqə" : "Связаться с нами"}
      </h1>

      <div className={styles.inner_text}>
        <p>
          {t("contact.message1")}{" "}
          <a
            href="mailto:info@biopet.az?subject=Request%20from%20website"
            target="_blank"
            rel="noopener noreferrer"
          >
            info@biopet.az
          </a>{" "}
          {t("contact.message2")} <a href="tel:876">876</a>{" "}
          {t("contact.message3")}
        </p>
      </div>

      <div className={styles.map_container}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d24308.607588797753!2d49.800540598651686!3d40.39609004459547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sbiopet!5e0!3m2!1saz!2saz!4v1751566166349!5m2!1saz!2saz"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Biopet xəritəsi"
          style={{ border: 0, width: "100%"}}
        ></iframe>
      </div>
    </div>
  );
};

export default ContactComp;
