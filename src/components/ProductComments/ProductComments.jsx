import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductComments.module.css";
import { useTranslation } from "react-i18next";
import { message, Rate, Form, Input, Button } from "antd";
import { supabase } from "../../../client";
import {
  EmptyStarSvg,
  FullFilledStarSvg,
  HalfStarSvg,
} from "../../assets/icons/Svg";
import { useAuth } from "../../context/AuthContext";

const ProductComments = () => {
  const { id } = useParams(); // product id
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();

  const { user } = useAuth();

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Comments")
      .select("*")
      .eq("productId", id)
      .order("created_at", { ascending: false });

    if (error) {
      message.error("Rəylər yüklənmədi!");
    } else {
      setComments(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const onFinish = async (values) => {
    setLoading(true); // düyməni deaktiv et
    const { text, star } = values;

    const { error } = await supabase.from("Comments").insert({
      productId: id,
      text,
      star,
      name: user.name,
      surname: user.surname,
    });

    if (error) {
      message.error("Şərh göndərilə bilmədi!");
    } else {
      message.success("Şərh uğurla göndərildi!");
      form.resetFields();
      await fetchComments(); // rəyləri yenilə
    }
    setLoading(false); // düyməni aktiv et
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FullFilledStarSvg key={`full-${i}`} />);
    }
    if (hasHalfStar) {
      stars.push(<HalfStarSvg key="half" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<EmptyStarSvg key={`empty-${i}`} />);
    }
    return stars;
  };

  return (
    <div className={styles.commentsSection}>
      <div className={styles.comment_writing_tab}>
        <h2 className={styles.comment_title}>
          {i18n.language === "az"
            ? "Məhsulun rəyləri 🧐"
            : "Обзоры продуктов 🧐"}
        </h2>
        {/* Comment form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className={styles.commentForm}
        >
          <Form.Item name="text">
            <Input.TextArea rows={4} style={{ resize: "none" }} />
          </Form.Item>
          <Form.Item name="star">
            <Rate />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              {i18n.language === "az" ? "Göndər" : "Отправлять"}
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Comment list */}
      <div className={styles.commentsList}>
        {comments.length === 0 && (
          <p>
            {i18n.language === "az"
              ? "Məhsul üçün rəy yoxdur"
              : "Отзывов о товаре нет."}
          </p>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.top_of_comment}>
              <div>
                <p className={styles.name}>
                  {comment.name} {comment.surname}
                </p>
              </div>
              <div className={styles.date_and_star}>
                <div className={styles.stars}>{renderStars(comment.star)}</div>
                <span className={styles.date}>
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComments;
