import styles from "./Service.module.css";

const Service = ({ src, text, title }) => {
  return (
    <div className={styles.service_box}>
      <img src={src}></img>
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Service;
