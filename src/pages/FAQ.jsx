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

const FAQ = () => {
  const [faq, setFAQ] = useState([]);

  useEffect(() => {
    const fetchFAQ = async () => {
      const { data, error } = await supabase.from("FAQ").select("*");
      if (!error) setFAQ(data);
      else console.error("FAQ error:", error);
    };

    fetchFAQ();
  }, []);

  const { t, i18n } = useTranslation();

  return (
    <>
      {" "}
      <div className={styles.faqContainer}>
        <h2 className={styles.faqTitle}>
          {i18n.language === "az"
            ? "FAQ - Tez-tez verilən suallar"
            : "FAQ – Часто задаваемые вопросы"}
        </h2>

        <div className={styles.faqAccordion}>
          {faq.map((item) => (
            <Accordion key={item.id} className={styles.faqItem}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={styles.faqQuestion}
              >
                <Typography>
                  {i18n.language === "az" ? item.questionAz : item.questionRu}
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
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
