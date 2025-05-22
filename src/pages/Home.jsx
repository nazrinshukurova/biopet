import Banner from "../components/HomeContainer/Banner/Banner";

import car from "../assets/svg/car.svg";
import flash from "../assets/svg/flash.svg";
import credit_card from "../assets/svg/credit-card.svg";
import message_circle from "../assets/svg/message-circle.svg";

import { useTranslation } from "react-i18next";
import Advertising from "../components/HomeContainer/Advertising/Advertising";
import Service from "../shared/ServicesComponents/Service";
import BrandSlider from "../shared/Brands/Brands";
import Footer from "../shared/Footer/Footer";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <Banner />
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 26px",
        }}
      >
        <CategoriesItem
          category_1={t("category.category_1")}
          category_2={t("category.category_2")}
          src1={src1}
          src2={src2}
          sub_category_1={category1}
          sub_category_2={category2}
          sub_category_3={category3}
          sub_category_4={category4}
        />
        <CategoriesItem
          category_1={t("category.category_3")}
          category_2={t("category.category_4")}
          src1={src3}
          src2={src4}
          sub_category_1={category5}
          sub_category_2={category6}
          sub_category_3={category7}
          sub_category_4={category8}
        />
      </div> */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "32px",
          margin: "0 32px",
          padding: "0 26px",
        }}
      >
        <SmallGroups title={t("small_groups.birds")} src={group1} />
        <SmallGroups title={t("small_groups.rabbits")} src={group2} />
        <SmallGroups title={t("small_groups.other_animals")} src={group3} />
      </div> */}
      <Advertising />
      <div className="service_container">
        <Service
          src={credit_card}
          text={t("services.card")}
          title={t("services.card_title")}
        />
        <Service
          src={flash}
          text={t("services.flash")}
          title={t("services.flash_title")}
        />
        <Service
          src={car}
          text={t("services.car")}
          title={t("services.car_title")}
        />
        <Service
          src={message_circle}
          text={t("services.message_circle")}
          title={t("services.message_circle_title")}
        />
      </div>
      <BrandSlider />
      <Footer />
    </div>
  );
};

export default Home;
