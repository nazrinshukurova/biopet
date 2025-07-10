import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../shared/Footer/Footer";
import Suggestions from "../shared/SuggestionsProducts/Suggestions";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../assets/icons/Svg";

const About = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {" "}
      <div
        className="about_container"
        style={{
          backgroundColor: "var(--container-bg)",
          color: "var(--textColor)",
        }}
      >
        <div className="breadcrumbs">
          <Link to="/" className="breadcrumb_link">
            Biopet
          </Link>{" "}
          <Breadcrumbs />
          <span className="breadcrumb_current">
            {i18n.language === "az"
              ? "Haqqımızda"
              : "О компании"}
          </span>
        </div>

        <div className="about">{t("about_title")}</div>

        <div className="about_text_box">
          {" "}
          <div className="about_text">
            <span className="company_name">Biopet Shop </span>
            {i18n.language === "az" ? (
              <>
                <span>
                  Azərbaycanda ev heyvanları üçün ən böyük internet portaldır.
                </span>
                <br />
                <span>
                  Layihəmiz Azərbaycanda ev heyvanlarını sevənlər üçün nəinki
                  alış-veriş etmək və maraqlandığınız mövzular haqqında vacib
                  məlumatlar əldə etmək, habelə xoş vaxt keçirmək, gələcəkdə isə
                  ünsiyyət qurmaq və interaktivlik üçün etibarlı bir mənbə
                  yaratmaq istəyinə əsaslanır.
                </span>
                <br />
                <span>Biz heyvanları sevirik.</span>
                <br />
                <span>Biz inkişaf etməyə və daha yaxşı olmağa hazırıq.</span>
                <br />
                <span>Biz sizin dəstəyinizə ümid edirik.</span>
              </>
            ) : (
              <>
                <span>
                  является крупнейшим интернет-порталом для домашних животных в
                  Азербайджане.
                </span>
                <br />
                <span>
                  В основе нашего проекта лежит огромное желание создать для
                  любителей домашних животных в Азербайджане надежный ресурс не
                  только для покупок и получения важной информации по
                  интересующим темам, но и просто для приятного
                  времяпрепровождения, а в будущем – общения и интерактива.
                </span>
                <br />
                <span>Мы любим животных.</span>
                <br />
                <span>Мы готовы развиваться и становиться лучше.</span>
                <br />
                <span>Мы надеемся на вашу поддержку.</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
