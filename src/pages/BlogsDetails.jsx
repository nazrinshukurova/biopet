import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../client";
import styles from "../styles/BlogsDetails.module.css";
import { Date, View } from "../assets/Svg";
import Footer from "../shared/Footer/Footer";

const BlogDetails = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("Blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Failed to fetch blog details");
        console.error(error);
      } else {
        setBlog(data);
      }
    };

    fetchBlog();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!blog) return <p>Loading...</p>;

  return (
    <>
      {" "}
      <div>
        {" "}
        <h1 className={styles.blog_title}>
          {i18n.language === "az" ? blog.NameAz : blog.NameRu}
        </h1>
        <div className={styles.blog_details}>
          <img
            src={blog.Image}
            alt="Blog visual"
            style={{ maxWidth: "100%" }}
          />
          <div className={styles.blog_details_desc_container}>
            {" "}
            <div className={styles.date_and_view}>
              <div className={styles.view}>
                <Date />
                <div>{blog.Date}</div>
              </div>
              <div className={styles.view}>
                {" "}
                <View />
                <div>{blog.View}</div>
              </div>
            </div>
            <p className={styles.blog_details_desc}>
              {i18n.language === "az" ? blog.TextAz : blog.TextRu}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
