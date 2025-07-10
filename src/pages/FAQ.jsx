import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../styles/Faq.module.css";
import { supabase } from "../../client";
import { useTranslation } from "react-i18next";
import Footer from "../shared/Footer/Footer";
import { BonusPopUp } from "../shared/ReusableItems/Reusable";
import Suggestions from "../shared/SuggestionsProducts/Suggestions";
import { Breadcrumbs } from "../assets/icons/Svg";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [faq, setFAQ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchFAQ = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("FAQ").select("*");

      if (error) {
        console.error("FAQ error:", error);
        setError(error);
      } else {
        setFAQ(data);
        setError(null);
      }
      setLoading(false);
    };

    fetchFAQ();
  }, []);

  return (
    <>
      {" "}
      <div
        style={{
          backgroundColor: "var(--container-bg)",
          color: "var(--textColor)",
          padding: "20px",
        }}
      >
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumb_link}>
            Biopet
          </Link>{" "}
          <Breadcrumbs />
          <span className={styles.breadcrumb_current}>
            {i18n.language === "az"
              ? "Tez-tez soruşulan suallar"
              : "Часто задаваемые вопросы"}
          </span>
        </div>
        <div className={styles.faqContainer}>
          <h2 className={styles.faqTitle}>
            {i18n.language === "az"
              ? "FAQ - Tez-tez verilən suallar"
              : "FAQ – Часто задаваемые вопросы"}
          </h2>

          {loading && !error && <div className="spinner"></div>}

          {!loading && !error && (
            <div className={styles.faqAccordion}>
              {faq.map((item) => (
                <Accordion key={item.id} className={styles.faqItem}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    className={styles.faqQuestion}
                  >
                    <Typography>
                      {i18n.language === "az"
                        ? item.questionAz
                        : item.questionRu}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={styles.faqAnswer}>
                    <Typography>
                      {i18n.language === "az" ? item.answerAz : item.answerRu}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          )}

          {error && (
            <div className={styles.error}>
              {i18n.language === "az"
                ? "Məlumat yüklənərkən xəta baş verdi."
                : "Произошла ошибка при загрузке данных."}
            </div>
          )}
        </div>
      </div>
      <Suggestions />
    </>
  );
};

export default FAQ;
