import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { Blog } from "../shared/ReusableItems/Reusable";
import Footer from "../shared/Footer/Footer";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { t, i18n } = useTranslation();

  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from("Blogs").select("*");
      if (error) {
        setError("Failed to fetch blogs");
        console.error(error);
      } else {
        const cleanedData = data.map((blog) => {
          const cleanedBlog = {};
          for (const key in blog) {
            const value = blog[key];
            cleanedBlog[key] = typeof value === "string" ? value.trim() : value;
          }
          return cleanedBlog;
        });

        setBlogs(cleanedData);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = async (blog) => {
    try {
      const updatedView = (blog.View || 0) + 1;

      await supabase
        .from("Blogs")
        .update({ View: updatedView })
        .eq("id", blog.id);

      setBlogs((prevBlogs) =>
        prevBlogs.map((b) =>
          b.id === blog.id ? { ...b, View: updatedView } : b
        )
      );
    } catch (err) {
      console.error("Failed to update view count:", err.message);
    }
  };

  return (
    <>
      <div>
        {error && <p>{error}</p>}
        {blogs.length === 0 && !error && <p>Loading blogs...</p>}
        <div
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          {blogs.map((blog) => (
            <Link
              to={`/blogs/${blog.id}`}
              key={blog.id}
              style={{ textDecoration: "none" }}
              onClick={() => handleBlogClick(blog)}
            >
              <Blog
                src={blog.Image}
                title={i18n.language === "az" ? blog.NameAz : blog.NameRu}
                view={blog.View}
                date={blog.Date}
              />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
