import { Date, View } from "../../assets/Svg";
import styles from "./Reusable.module.css";

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
