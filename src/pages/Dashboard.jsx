import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Typography,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Space,
  Switch,
  DatePicker,
} from "antd";
import { Radio } from "antd";

import {
  UserOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../../client";
import moment from "moment";
import logo from "../assets/svg/biopet_blue_logo.svg";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [products, setProducts] = useState([]);

  console.log(faqs);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingFaqs, setLoadingFaqs] = useState(true);

  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("products");

  // Modal states
  const [isProductModalVisible, setProductModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isUserEditModalVisible, setUserEditModalVisible] = useState(false);
  const [isBlogModalVisible, setBlogModalVisible] = useState(false);
  const [isBlogEditModalVisible, setBlogEditModalVisible] = useState(false);
  const [isFaqModalVisible, setFaqModalVisible] = useState(false);
  const [isFaqEditModalVisible, setFaqEditModalVisible] = useState(false);

  // Editing states
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);

  // Forms
  const [formProduct] = Form.useForm();
  const [formEditProduct] = Form.useForm();
  const [formEditUser] = Form.useForm();
  const [formBlog] = Form.useForm();
  const [formEditBlog] = Form.useForm();
  const [formFaq] = Form.useForm();
  const [formEditFaq] = Form.useForm();

  // Fetch functions

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("Cats").select("*");
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      const trimmedData = data.map((item) => {
        const trimmedItem = {};
        for (const key in item) {
          const value = item[key];
          trimmedItem[key] = typeof value === "string" ? value.trim() : value;
        }
        return trimmedItem;
      });
      setProducts(trimmedData);
    }
    setLoadingProducts(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    const { data, error } = await supabase.from("Users").select("*");
    if (error) {
      message.error("İstifadəçilər yüklənərkən xəta baş verdi!");
    } else {
      setUsers(data);
    }
    setLoadingUsers(false);
  };

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    const { data, error } = await supabase.from("Blogs").select("*");
    if (error) {
      message.error("Bloqlar yüklənərkən xəta baş verdi!");
    } else {
      setBlogs(data);
    }
    setLoadingBlogs(false);
  };

  const fetchFaqs = async () => {
    setLoadingFaqs(true);
    const { data, error } = await supabase.from("FAQ").select("*");
    if (error) {
      message.error("FAQ-lar yüklənərkən xəta baş verdi!");
    } else {
      setFaqs(data);
    }
    setLoadingFaqs(false);
  };

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "blogs") {
      fetchBlogs();
    } else if (activeTab === "faqs") {
      fetchFaqs();
    }
  }, [activeTab]);

  // Product functions (existing)
  const handleEditProduct = (record) => {
    setEditingProduct(record);
    setEditModalVisible(true);
    formEditProduct.setFieldsValue(record);
  };

  const handleUpdateProduct = async (values) => {
    const { error } = await supabase
      .from("Cats")
      .update(values)
      .eq("id", editingProduct.id);

    if (error) {
      message.error("Məhsul yenilənərkən xəta baş verdi!");
    } else {
      message.success("Məhsul uğurla yeniləndi!");
      setEditModalVisible(false);
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id) => {
    const { error } = await supabase.from("Cats").delete().eq("id", id);

    if (error) {
      message.error("Məhsul silinərkən xəta baş verdi!");
    } else {
      message.success("Məhsul uğurla silindi!");
      fetchProducts();
    }
  };

  const onAddProduct = async (values) => {
    const { error } = await supabase.from("Cats").insert([values]);
    if (error) {
      message.error("Məhsul əlavə edilərkən xəta baş verdi!");
    } else {
      message.success("Məhsul uğurla əlavə edildi!");
      setProductModalVisible(false);
      formProduct.resetFields();
      fetchProducts();
    }
  };

  // User functions (existing)
  const handleEditUser = (record) => {
    setEditingUser(record);
    setUserEditModalVisible(true);
    formEditUser.setFieldsValue(record);
  };

  const handleUpdateUser = async (values) => {
    const { error } = await supabase
      .from("Users")
      .update(values)
      .eq("id", editingUser.id);

    if (error) {
      message.error("İstifadəçi yenilənərkən xəta baş verdi!");
    } else {
      message.success("İstifadəçi uğurla yeniləndi!");
      setUserEditModalVisible(false);
      fetchUsers();
    }
  };

  const handleDeleteUser = async (id) => {
    const { error } = await supabase.from("Users").delete().eq("id", id);

    if (error) {
      message.error("İstifadəçi silinərkən xəta baş verdi!");
    } else {
      message.success("İstifadəçi uğurla silindi!");
      fetchUsers();
    }
  };

  // Blog functions
  const onAddBlog = async (values) => {
    const blogData = {
      ...values,
    };

    const { error } = await supabase.from("Blogs").insert([blogData]);
    if (error) {
      message.error("Bloq əlavə edilərkən xəta baş verdi!");
    } else {
      message.success("Bloq uğurla əlavə edildi!");
      setBlogModalVisible(false);
      formBlog.resetFields();
      fetchBlogs();
    }
  };

  const handleEditBlog = (record) => {
    setEditingBlog(record);
    setBlogEditModalVisible(true);
    const formData = {
      ...record,
      publish_date: record.publish_date ? moment(record.publish_date) : null,
    };
    formEditBlog.setFieldsValue(formData);
  };

  const handleUpdateBlog = async (values) => {
    const blogData = {
      ...values,
    };

    const { error } = await supabase
      .from("Blogs")
      .update(blogData)
      .eq("id", editingBlog.id);

    if (error) {
      message.error("Bloq yenilənərkən xəta baş verdi!");
    } else {
      message.success("Bloq uğurla yeniləndi!");
      setBlogEditModalVisible(false);
      fetchBlogs();
    }
  };

  const handleDeleteBlog = async (id) => {
    const { error } = await supabase.from("Blogs").delete().eq("id", id);

    if (error) {
      message.error("Bloq silinərkən xəta baş verdi!");
    } else {
      message.success("Bloq uğurla silindi!");
      fetchBlogs();
    }
  };

  // FAQ functions
  const onAddFaq = async (values) => {
    const faqData = {
      ...values,
    };

    const { error } = await supabase.from("FAQ").insert([faqData]);
    if (error) {
      message.error("FAQ əlavə edilərkən xəta baş verdi!");
    } else {
      message.success("FAQ uğurla əlavə edildi!");
      setFaqModalVisible(false);
      formFaq.resetFields();
      fetchFaqs();
    }
  };

  console.log(user, "USER");

  const handleEditFaq = (record) => {
    setEditingFaq(record);
    setFaqEditModalVisible(true);
    formEditFaq.setFieldsValue(record);
  };

  const handleUpdateFaq = async (values) => {
    const faqData = {
      ...values,
    };

    const { error } = await supabase
      .from("FAQ")
      .update(faqData)
      .eq("id", editingFaq.id);

    if (error) {
      message.error("FAQ yenilənərkən xəta baş verdi!");
    } else {
      message.success("FAQ uğurla yeniləndi!");
      setFaqEditModalVisible(false);
      fetchFaqs();
    }
  };

  const handleDeleteFaq = async (id) => {
    const { error } = await supabase.from("FAQ").delete().eq("id", id);

    if (error) {
      message.error("FAQ silinərkən xəta baş verdi!");
    } else {
      message.success("FAQ uğurla silindi!");
      fetchFaqs();
    }
  };

  // Table columns

  const productColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 100,
      render: (value) =>
        value != null && value !== "" ? value : "Məlumat yoxdur",
    },
    {
      title: "Şəkil",
      dataIndex: "İmage",
      key: "İmage",
      width: 200,
      render: (text) =>
        text ? (
          <div
            style={{
              maxHeight: "100px",
              maxWidth: "200px",
              paddingRight: "5px",
            }}
          >
            <img
              src={text}
              alt="blog"
              style={{ width: "100px", height: "100px", display: "block" }}
            />
          </div>
        ) : (
          "Məlumat yoxdur"
        ),
    },
    {
      title: "Ad (Azərbaycanca)",
      dataIndex: "NameAz",
      key: "NameAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Ad (Rusca)",
      dataIndex: "NameRu",
      key: "NameRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Marka (Azərbaycanca)",
      dataIndex: "BrandAz",
      key: "BrandAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Ölkə (Azərbaycanca)",
      dataIndex: "CountryAz",
      key: "CountryAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Qablaşdırma",
      dataIndex: "Package",
      key: "Package",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Qida növü (Azərbaycanca)",
      dataIndex: "FoodTypeAz",
      key: "FoodTypeAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Məhsul növü (Azərbaycanca)",
      dataIndex: "ProductTypeAz",
      key: "ProductTypeAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Yaş qrupu (Azərbaycanca)",
      dataIndex: "AgeAz",
      key: "AgeAz",
      width: 150,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Sterilizasiya olunub?",
      dataIndex: "İsSterilised",
      key: "İsSterilised",
      width: 150,
      render: (value) =>
        value === true ? "Bəli" : value === false ? "Xeyr" : "Məlumat yoxdur",
    },
    {
      title: "Heyvan növü (Azərbaycanca)",
      dataIndex: "AnimalTypeAz",
      key: "AnimalTypeAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Tərkibi (Azərbaycanca)",
      dataIndex: "İngredientsAz",
      key: "İngredientsAz",
      width: 250,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Qiymət",
      dataIndex: "Price",
      key: "Price",
      width: 150,
      render: (value) => (value != null ? value : "Məlumat yoxdur"),
    },
    {
      title: "Endirim varmı?",
      dataIndex: "isDiscount",
      key: "isDiscount",
      width: 150,
      render: (value) =>
        value === true ? "Bəli" : value === false ? "Xeyr" : "Məlumat yoxdur",
    },
    {
      title: "Reytinq",
      dataIndex: "Rating",
      key: "Rating",
      width: 150,
      render: (value) => (value != null ? value : "Məlumat yoxdur"),
    },
    {
      title: "Ölkə (Rusca)",
      dataIndex: "CountryRu",
      key: "CountryRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Qida növü (Rusca)",
      dataIndex: "FoodTypeRu",
      key: "FoodTypeRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Məhsul növü (Rusca)",
      dataIndex: "ProductTypeRu",
      key: "ProductTypeRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Heyvan növü (Rusca)",
      dataIndex: "AnimalTypeRu",
      key: "AnimalTypeRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Tərkibi (Rusca)",
      dataIndex: "IngredientsRu",
      key: "IngredientsRu",
      width: 250,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Yaş qrupu (Rusca)",
      dataIndex: "AgeRu",
      key: "AgeRu",
      width: 150,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Pəhriz və profilaktika (Azərbaycanca)",
      dataIndex: "DietAndPreventionAz",
      key: "DietAndPreventionAz",
      width: 250,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Pəhriz və profilaktika (Rusca)",
      dataIndex: "DietAndPreventionRu",
      key: "DietAndPreventionRu",
      width: 250,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Baytarlıq pəhrizi (Azərbaycanca)",
      dataIndex: "BaytarlıqPəhriziAz",
      key: "BaytarlıqPəhriziAz",
      width: 250,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Xəstəlik (Azərbaycanca)",
      dataIndex: "XəstəlikAz",
      key: "XəstəlikAz",
      width: 250,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Baytarlıq pəhrizi (Rusca)",
      dataIndex: "BaytarlıqPəhriziRu",
      key: "BaytarlıqPəhriziRu",
      width: 250,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Xəstəlik (Rusca)",
      dataIndex: "XəstəlikRu",
      key: "XəstəlikRu",
      width: 250,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Əczaçılıq göstərişi (Azərbaycanca)",
      dataIndex: "PharmacyAppointmentAz",
      key: "PharmacyAppointmentAz",
      width: 250,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Əczaçılıq göstərişi (Rusca)",
      dataIndex: "PharmacyAppointmentRu",
      key: "PharmacyAppointmentRu",
      width: 250,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Endirim faizi",
      dataIndex: "PercentOfDiscount",
      key: "PercentOfDiscount",
      width: 150,
      render: (value) => (value != null ? value : "Məlumat yoxdur"),
    },
    {
      title: "Anbarda var?",
      dataIndex: "InStock",
      key: "InStock",
      width: 150,
      render: (value) =>
        value === true ? "Bəli" : value === false ? "Xeyr" : "Məlumat yoxdur",
    },
    {
      title: "Ətir (Azərbaycanca)",
      dataIndex: "AromaAz",
      key: "AromaAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Material (Azərbaycanca)",
      dataIndex: "MaterialAz",
      key: "MaterialAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Qum növü (Azərbaycanca)",
      dataIndex: "TypeOfSandAz",
      key: "TypeOfSandAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Material (Rusca)",
      dataIndex: "MaterialRu",
      key: "MaterialRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Ətir (Rusca)",
      dataIndex: "AromaRu",
      key: "AromaRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Qum növü (Rusca)",
      dataIndex: "TypeOfSandRu",
      key: "TypeOfSandRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Peçenye növü (Azərbaycanca)",
      dataIndex: "CookieTypeAz",
      key: "CookieTypeAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Peçenye növü (Rusca)",
      dataIndex: "CookieTypeRu",
      key: "CookieTypeRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "İt ölçüsü (Azərbaycanca)",
      dataIndex: "DogSizeAz",
      key: "DogSizeAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "İt ölçüsü (Rusca)",
      dataIndex: "DogSizeRu",
      key: "DogSizeRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Rəng (Azərbaycanca)",
      dataIndex: "ColorAz",
      key: "ColorAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Rəng (Rusca)",
      dataIndex: "ColorRu",
      key: "ColorRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Aksesuar növü (Azərbaycanca)",
      dataIndex: "TypeOfAccessoriesAz",
      key: "TypeOfAccessoriesAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Qulluq məhsulları növü (Azərbaycanca)",
      dataIndex: "TypeOfCareProductsAz",
      key: "TypeOfCareProductsAz",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Məhsulun ölçüsü",
      dataIndex: "ProductSize",
      key: "ProductSize",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Aksesuar növü (Rusca)",
      dataIndex: "TypeOfAccessoriesRu",
      key: "TypeOfAccessoriesRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Qulluq məhsulları növü (Rusca)",
      dataIndex: "TypeOfCareProductsRu",
      key: "TypeOfCareProductsRu",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },

    {
      title: "Heyvan açarı",
      dataIndex: "AnimalKey",
      key: "AnimalKey",
      width: 150,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Tərkib açarı",
      dataIndex: "IngredientsKey",
      key: "IngredientsKey",
      width: 150,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Qida növü açarı",
      dataIndex: "FoodTypeKey",
      key: "FoodTypeKey",
      width: 150,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Məhsul növü açarı",
      dataIndex: "ProductTypeKey",
      key: "ProductTypeKey",
      width: 150,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Yaş qrupu açarı",
      dataIndex: "AgeKey",
      key: "AgeKey",
      width: 150,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "İt ölçüsü açarı",
      dataIndex: "DogSizeKey",
      key: "DogSizeKey",
      width: 150,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Marka açarı",
      dataIndex: "BrandKey",
      key: "BrandKey",
      width: 150,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },
    {
      title: "Əczaçılıq göstərişi açarı",
      dataIndex: "PharmacyAppointmentKey",
      key: "PharmacyAppointmentKey",
      width: 200,
      render: (value) => (value ? value : "Məlumat yoxdur"),
    },

    {
      title: "Əməliyyatlar",
      key: "action",
      fixed: "right",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
            size="small"
          >
            Düzəliş
          </Button>
          <Popconfirm
            title="Məhsulu silmək istədiyinizə əminsiniz?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Bəli"
            cancelText="Xeyr"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const userColumns = [
    { title: "ID", dataIndex: "id", key: "id", width: 100 },
    { title: "Ad", dataIndex: "name", key: "name", width: 200 },
    { title: "Soyad", dataIndex: "surname", key: "surname", width: 200 },
    { title: "Email", dataIndex: "email", key: "email", width: 250 },
    {
      title: "Yaradılma tarixi",
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (text) => (text ? new Date(text).toLocaleDateString() : ""),
    },
    {
      title: "Əməliyyatlar",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
            size="small"
          >
            Düzəliş et
          </Button>
          <Popconfirm
            title="İstifadəçini silmək istədiyinizə əminsiniz?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Bəli"
            cancelText="Xeyr"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const blogColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 80,
      maxWidth: 100,
    },
    {
      title: "Başlıq (AZ)",
      dataIndex: "NameAz",
      key: "NameAz",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Başlıq (RU)",
      dataIndex: "NameRu",
      key: "NameRu",
      width: 200,
    },
    {
      title: "Baxış sayı",
      dataIndex: "View",
      key: "View",
      width: 80,
      maxWidth: 200,
    },
    {
      title: "Mətn (AZ)",
      dataIndex: "TextAz",
      key: "TextAz",
      width: 200,
      render: (text) => (
        <div
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            paddingRight: "5px",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Mətn (RU)",
      dataIndex: "TextRu",
      key: "TextRu",
      width: 200,
      render: (text) => (
        <div
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            paddingRight: "5px",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Şəkil",
      dataIndex: "Image",
      key: "Image",
      width: 200,
      render: (text) => (
        <div
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            paddingRight: "5px",
          }}
        >
          <img
            src={text}
            alt="blog"
            style={{ width: "100%", display: "block" }}
          />
        </div>
      ),
    },
    {
      title: "Tarix",
      dataIndex: "Date",
      key: "Date",
      width: 100,
      maxWidth: 200,
      render: (text) =>
        text ? new Date(text).toLocaleDateString() : "Təyin edilməyib",
    },
    {
      title: "Əməliyyatlar",
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditBlog(record)}
            size="small"
          >
            Düzəliş et
          </Button>
          <Popconfirm
            title="Bloqu silmək istədiyinizə əminsiniz?"
            onConfirm={() => handleDeleteBlog(record.id)}
            okText="Bəli"
            cancelText="Xeyr"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const faqColumns = [
    { title: "ID", dataIndex: "id", key: "id", width: 30, fixed: "left" },
    {
      title: "Sual (AZ)",
      dataIndex: "questionAz",
      key: "questionAz",
      width: 100,
    },
    {
      title: "Sual (RU)",
      dataIndex: "questionRu",
      key: "questionRu",
      width: 100,
    },
    {
      title: "Cavab (AZ)",
      dataIndex: "answerAz",
      key: "answerAz",
      width: 100,
    },
    {
      title: "Cavab (RU)",
      dataIndex: "answerRu",
      key: "answerRu",
      width: 100,
    },
    {
      title: "Əməliyyatlar",
      key: "action",
      width: 70,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditFaq(record)}
            size="small"
          >
            Düzəliş et
          </Button>
          <Popconfirm
            title="FAQ-ı silmək istədiyinizə əminsiniz?"
            onConfirm={() => handleDeleteFaq(record.id)}
            okText="Bəli"
            cancelText="Xeyr"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(val) => setCollapsed(val)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: 6,
            textAlign: "center",
            color: "white",
            lineHeight: "32px",
            fontWeight: "bold",
          }}
        >
          {collapsed ? "DB" : "Dashboard"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={({ key }) => setActiveTab(key)}
        >
          <Menu.Item key="products" icon={<AppstoreOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="blogs" icon={<FileTextOutlined />}>
            Blogs
          </Menu.Item>
          <Menu.Item key="faqs" icon={<QuestionCircleOutlined />}>
            FAQs
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "40px 16px 16px 16px",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <div>
              <img src={logo}></img>
            </div>
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 0 16px 0",
            }}
          >
            {" "}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar>{user?.name?.[0] || <UserOutlined />}</Avatar>
              <span>
                {user?.name} {user?.surname}
              </span>
            </div>
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </Header>

        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
            {activeTab === "products" && (
              <>
                <Title level={4}>
                  Products{" "}
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setProductModalVisible(true)}
                    style={{ float: "right" }}
                  >
                    Add Product
                  </Button>
                </Title>
                <Table
                  columns={productColumns}
                  dataSource={products}
                  rowKey="id"
                  loading={loadingProducts}
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: 3000 }}
                />
              </>
            )}

            {activeTab === "users" && (
              <>
                <Title level={4}>Users</Title>
                <Table
                  columns={userColumns}
                  dataSource={users}
                  rowKey="id"
                  loading={loadingUsers}
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: 1000 }}
                />
              </>
            )}

            {activeTab === "blogs" && (
              <>
                <Title level={4}>
                  Blogs{" "}
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setBlogModalVisible(true)}
                    style={{ float: "right" }}
                  >
                    Add Blog
                  </Button>
                </Title>
                <Table
                  columns={blogColumns}
                  dataSource={blogs}
                  rowKey="id"
                  loading={loadingBlogs}
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: "max-content" }} // Daha dinamik scroll
                />
              </>
            )}

            <Modal
              title="Add New Blog"
              visible={isBlogModalVisible}
              onCancel={() => {
                setBlogModalVisible(false);
                formBlog.resetFields();
              }}
              footer={null}
              destroyOnClose
            >
              <Form form={formBlog} layout="vertical" onFinish={onAddBlog}>
                <Form.Item
                  name="NameAz"
                  label="NameAz"
                  rules={[{ required: false, message: "NameAz is required" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="NameRu" label="NameRu">
                  <Input />
                </Form.Item>

                <Form.Item name="View" label="View">
                  <Input />
                </Form.Item>

                <Form.Item name="TextAz" label="TextAz">
                  <Input />
                </Form.Item>

                <Form.Item name="TextRu" label="TextRu">
                  <Input />
                </Form.Item>

                <Form.Item name="İmage" label="İmage">
                  <Input />
                </Form.Item>

                <Form.Item name="Date" label="Date">
                  <Input />
                </Form.Item>

                {/* is ilə başlayan bütün sahələr Checkbox ilə */}
                <Form.Item
                  name="isDiscount"
                  label="Is Discount"
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>

                <Form.Item
                  name="isActive"
                  label="Is Active"
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>

                <Form.Item
                  name="isPublished"
                  label="Is Published"
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>

                <Form.Item
                  name="isFeatured"
                  label="Is Featured"
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Add Blog
                  </Button>
                </Form.Item>
              </Form>
            </Modal>

            {activeTab === "faqs" && (
              <>
                <Title level={4}>
                  FAQs{" "}
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setFaqModalVisible(true)}
                    style={{ float: "right" }}
                  >
                    Add FAQ
                  </Button>
                </Title>
                <Table
                  columns={faqColumns}
                  dataSource={faqs}
                  rowKey="id"
                  loading={loadingFaqs}
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: 1400 }}
                />
              </>
            )}
          </div>

          <Modal
            title="Add New FAQ"
            visible={isFaqModalVisible}
            onCancel={() => {
              setFaqModalVisible(false);
              formFaq.resetFields();
            }}
            footer={null}
            afterClose={() => formFaq.resetFields()}
          >
            <Form form={formFaq} layout="vertical" onFinish={onAddFaq}>
              <Form.Item
                name="questionAz"
                label="questionAz"
                rules={[{ required: false, message: "questionAz is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="answerAz"
                label="answerAz"
                rules={[{ required: false, message: "answerAz is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="questionRu"
                label="questionRu"
                rules={[{ required: false, message: "questionRu is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="answerRu"
                label="answerRu"
                rules={[{ required: false, message: "answerRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Add FAQ
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* Product Modals (existing) */}

          <Modal
            title="Add New Product"
            visible={isProductModalVisible}
            onCancel={() => {
              setFaqModalVisible(false);
              formProduct.resetFields();
            }}
            footer={null}
            afterClose={() => formProduct.resetFields()}
          >
            <div
              style={{
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              <Form
                form={formProduct}
                layout="vertical"
                onFinish={onAddProduct}
              >
                <Form.Item
                  name="İmage"
                  label="Şəkil"
                  rules={[
                    {
                      pattern: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                      message:
                        "Zəhmət olmasa düzgün şəkil linki daxil edin (png, jpg, jpeg, gif, svg)",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="NameAz"
                  label="Ad (AZ)"
                  rules={[
                    {
                      pattern: /^[a-zA-ZəöğüçşıƏÖĞÜÇŞİI0-9\s-]+$/,
                      message:
                        "Ad yalnız hərflər, rəqəmlər, boşluq və tire ilə ola bilər",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="Price"
                  label="Qiymət"
                  rules={[
                    { required: false, message: "Qiymət daxil edilməlidir" },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} step={0.01} />
                </Form.Item>

                <Form.Item
                  name="NameRu"
                  label="Ad (RU)"
                  rules={[
                    {
                      pattern: /^[a-zA-Z0-9а-яё\s-]+$/i,
                      message:
                        "Ad yalnız hərflər, rəqəmlər, boşluq və tire ilə ola bilər",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="BrandAz"
                  label="Brend (AZ)"
                  rules={[
                    {
                      pattern: /^[a-zA-ZəöğüçşıƏÖĞÜÇŞİI0-9\s-]+$/,
                      message:
                        "Brend yalnız hərflər, rəqəmlər, boşluq və tire ilə ola bilər",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="CountryAz"
                  label="Ölkə (AZ)"
                  rules={[
                    {
                      pattern: /^[a-zA-ZəöğüçşıƏÖĞÜÇŞİI\s-]+$/,
                      message:
                        "Ölkə yalnız hərflər, boşluq və tire ilə ola bilər",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="CountryRu"
                  label="Ölkə (RU)"
                  rules={[
                    {
                      pattern: /^[а-яё\s-]+$/i,
                      message:
                        "Ölkə yalnız rus hərfləri, boşluq və tire ilə ola bilər",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="InStock"
                  label="Stokda var?"
                  rules={[
                    {
                      required: false,
                      message: "Zəhmət olmasa stok vəziyyətini seçin",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={true}>Bəli</Radio>
                    <Radio value={false}>Xeyr</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="PercentOfDiscount"
                  label="Endirim Faizi"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 100,
                      message: "Endirim faizi 0 ilə 100 arasında olmalıdır",
                    },
                  ]}
                >
                  <InputNumber min={0} max={100} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  name="Rating"
                  label="Reytinq"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 5,
                      message: "Reytinq 0 ilə 5 arasında olmalıdır",
                    },
                  ]}
                >
                  <InputNumber min={0} max={5} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Məhsulu əlavə et
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>

          {/* Product Edit Modal */}
          <Modal
            title="Edit Product"
            visible={isEditModalVisible}
            onCancel={() => setEditModalVisible(false)}
            footer={null}
            destroyOnClose
          >
            <Form
              form={formEditProduct}
              layout="vertical"
              onFinish={handleUpdateProduct}
            >
              <Form.Item
                name="NameAz"
                label="NameAz"
                rules={[{ required: false, message: "NameAz is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Price"
                label="Price"
                rules={[{ required: false, message: "Price is required" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="BrandAz" label="BrandAz">
                <Input />
              </Form.Item>
              <Form.Item
                name="NameRu"
                label="NameRu"
                rules={[{ required: false, message: "NameRu is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="CountryAz"
                label="CountryAz"
                rules={[{ required: false, message: "CountryAz is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Package"
                label="Package"
                rules={[{ required: false, message: "Package is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="InStock"
                label="Stokda var?"
                rules={[
                  {
                    required: false,
                    message: "Zəhmət olmasa stok vəziyyətini seçin",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={true}>Bəli</Radio>
                  <Radio value={false}>Xeyr</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Update Product
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* User Edit Modal */}
          <Modal
            title="Edit User"
            visible={isUserEditModalVisible}
            onCancel={() => setUserEditModalVisible(false)}
            footer={null}
            destroyOnClose
          >
            <Form
              form={formEditUser}
              layout="vertical"
              onFinish={handleUpdateUser}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: false, message: "Name is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="surname"
                label="Surname"
                rules={[{ required: false, message: "Surname is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: false, message: "Email is required" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Update User
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* Blog Edit Modal */}
          <Modal
            title="Edit Blog"
            visible={isBlogEditModalVisible}
            onCancel={() => setBlogEditModalVisible(false)}
            footer={null}
            destroyOnClose
          >
            <Form
              form={formEditBlog}
              layout="vertical"
              onFinish={handleUpdateBlog}
            >
              <Form.Item name="NameAz" label="NameAz">
                <Input />
              </Form.Item>
              <Form.Item name="NameRu" label="NameRu">
                <Input />
              </Form.Item>
              <Form.Item name="View" label="View">
                <Input />
              </Form.Item>
              <Form.Item name="TextAz" label="TextAz">
                <Input />
              </Form.Item>
              <Form.Item name="TextRu" label="TextRu">
                <Input />
              </Form.Item>
              <Form.Item name="İmage" label="İmage">
                <Input />
              </Form.Item>
              <Form.Item name="Date" label="Date">
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Update Blog
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* FAQ Edit Modal */}
          <Modal
            title="Edit FAQ"
            visible={isFaqEditModalVisible}
            onCancel={() => setFaqEditModalVisible(false)}
            footer={null}
            destroyOnClose
          >
            <Form
              form={formEditFaq}
              layout="vertical"
              onFinish={handleUpdateFaq}
            >
              <Form.Item name="questionAz" label="questionAz">
                <Input />
              </Form.Item>
              <Form.Item name="questionRu" label="questionRu">
                <Input />
              </Form.Item>
              <Form.Item name="answerAz" label="answerAz">
                <Input />
              </Form.Item>
              <Form.Item name="answerRu" label="answerRu">
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Update FAQ
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
