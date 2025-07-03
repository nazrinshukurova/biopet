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
import { useProducts } from "../context/ProductContext";
import moment from "moment";
import logo from "../assets/svg/biopet_blue_logo.svg";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { products, loading, fetchProducts } = useProducts();

  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);

  console.log(faqs);

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
      render: (value) => (value != null && value !== "" ? value : "null"),
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
          "null"
        ),
    },
    {
      title: "Ad (Azərbaycanca)",
      dataIndex: "NameAz",
      key: "NameAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Ad (Rusca)",
      dataIndex: "NameRu",
      key: "NameRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Marka (Azərbaycanca)",
      dataIndex: "BrandAz",
      key: "BrandAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Ölkə (Azərbaycanca)",
      dataIndex: "CountryAz",
      key: "CountryAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Qablaşdırma",
      dataIndex: "Package",
      key: "Package",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Qida növü (Azərbaycanca)",
      dataIndex: "FoodTypeAz",
      key: "FoodTypeAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Məhsul növü (Azərbaycanca)",
      dataIndex: "ProductTypeAz",
      key: "ProductTypeAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Yaş qrupu (Azərbaycanca)",
      dataIndex: "AgeAz",
      key: "AgeAz",
      width: 150,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Sterilizasiya olunub?",
      dataIndex: "İsSterilised",
      key: "İsSterilised",
      width: 150,
      render: (value) =>
        value === true ? "Bəli" : value === false ? "Xeyr" : "null",
    },
    {
      title: "Heyvan növü (Azərbaycanca)",
      dataIndex: "AnimalTypeAz",
      key: "AnimalTypeAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Tərkibi (Azərbaycanca)",
      dataIndex: "İngredientsAz",
      key: "İngredientsAz",
      width: 250,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Qiymət",
      dataIndex: "Price",
      key: "Price",
      width: 150,
      render: (value) => (value != null ? value : "null"),
    },
    {
      title: "Endirim varmı?",
      dataIndex: "isDiscount",
      key: "isDiscount",
      width: 150,
      render: (value) =>
        value === true ? "Bəli" : value === false ? "Xeyr" : "null",
    },
    {
      title: "Reytinq",
      dataIndex: "Rating",
      key: "Rating",
      width: 150,
      render: (value) => (value != null ? value : "null"),
    },
    {
      title: "Ölkə (Rusca)",
      dataIndex: "CountryRu",
      key: "CountryRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Qida növü (Rusca)",
      dataIndex: "FoodTypeRu",
      key: "FoodTypeRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Məhsul növü (Rusca)",
      dataIndex: "ProductTypeRu",
      key: "ProductTypeRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Heyvan növü (Rusca)",
      dataIndex: "AnimalTypeRu",
      key: "AnimalTypeRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Tərkibi (Rusca)",
      dataIndex: "IngredientsRu",
      key: "IngredientsRu",
      width: 250,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Yaş qrupu (Rusca)",
      dataIndex: "AgeRu",
      key: "AgeRu",
      width: 150,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Pəhriz və profilaktika (Azərbaycanca)",
      dataIndex: "DietAndPreventionAz",
      key: "DietAndPreventionAz",
      width: 250,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Pəhriz və profilaktika (Rusca)",
      dataIndex: "DietAndPreventionRu",
      key: "DietAndPreventionRu",
      width: 250,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Baytarlıq pəhrizi (Azərbaycanca)",
      dataIndex: "BaytarlıqPəhriziAz",
      key: "BaytarlıqPəhriziAz",
      width: 250,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Xəstəlik (Azərbaycanca)",
      dataIndex: "XəstəlikAz",
      key: "XəstəlikAz",
      width: 250,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Baytarlıq pəhrizi (Rusca)",
      dataIndex: "BaytarlıqPəhriziRu",
      key: "BaytarlıqPəhriziRu",
      width: 250,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Xəstəlik (Rusca)",
      dataIndex: "XəstəlikRu",
      key: "XəstəlikRu",
      width: 250,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Əczaçılıq göstərişi (Azərbaycanca)",
      dataIndex: "PharmacyAppointmentAz",
      key: "PharmacyAppointmentAz",
      width: 250,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Əczaçılıq göstərişi (Rusca)",
      dataIndex: "PharmacyAppointmentRu",
      key: "PharmacyAppointmentRu",
      width: 250,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Endirim faizi",
      dataIndex: "PercentOfDiscount",
      key: "PercentOfDiscount",
      width: 150,
      render: (value) => (value != null ? value : "null"),
    },
    {
      title: "Anbarda var?",
      dataIndex: "InStock",
      key: "InStock",
      width: 150,
      render: (value) =>
        value === true ? "Bəli" : value === false ? "Xeyr" : "null",
    },
    {
      title: "Ətir (Azərbaycanca)",
      dataIndex: "AromaAz",
      key: "AromaAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Material (Azərbaycanca)",
      dataIndex: "MaterialAz",
      key: "MaterialAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Qum növü (Azərbaycanca)",
      dataIndex: "TypeOfSandAz",
      key: "TypeOfSandAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Material (Rusca)",
      dataIndex: "MaterialRu",
      key: "MaterialRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Ətir (Rusca)",
      dataIndex: "AromaRu",
      key: "AromaRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Qum növü (Rusca)",
      dataIndex: "TypeOfSandRu",
      key: "TypeOfSandRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Peçenye növü (Azərbaycanca)",
      dataIndex: "CookieTypeAz",
      key: "CookieTypeAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Peçenye növü (Rusca)",
      dataIndex: "CookieTypeRu",
      key: "CookieTypeRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "İt ölçüsü (Azərbaycanca)",
      dataIndex: "DogSizeAz",
      key: "DogSizeAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "İt ölçüsü (Rusca)",
      dataIndex: "DogSizeRu",
      key: "DogSizeRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Rəng (Azərbaycanca)",
      dataIndex: "ColorAz",
      key: "ColorAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Rəng (Rusca)",
      dataIndex: "ColorRu",
      key: "ColorRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Aksesuar növü (Azərbaycanca)",
      dataIndex: "TypeOfAccessoriesAz",
      key: "TypeOfAccessoriesAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Qulluq məhsulları növü (Azərbaycanca)",
      dataIndex: "TypeOfCareProductsAz",
      key: "TypeOfCareProductsAz",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Məhsulun ölçüsü",
      dataIndex: "ProductSize",
      key: "ProductSize",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Aksesuar növü (Rusca)",
      dataIndex: "TypeOfAccessoriesRu",
      key: "TypeOfAccessoriesRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Qulluq məhsulları növü (Rusca)",
      dataIndex: "TypeOfCareProductsRu",
      key: "TypeOfCareProductsRu",
      width: 200,
      render: (value) => (value ? value : "null"),
    },

    {
      title: "Heyvan açarı",
      dataIndex: "AnimalKey",
      key: "AnimalKey",
      width: 150,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Tərkib açarı",
      dataIndex: "IngredientsKey",
      key: "IngredientsKey",
      width: 150,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Qida növü açarı",
      dataIndex: "FoodTypeKey",
      key: "FoodTypeKey",
      width: 150,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Məhsul növü açarı",
      dataIndex: "ProductTypeKey",
      key: "ProductTypeKey",
      width: 150,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Yaş qrupu açarı",
      dataIndex: "AgeKey",
      key: "AgeKey",
      width: 150,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "İt ölçüsü açarı",
      dataIndex: "DogSizeKey",
      key: "DogSizeKey",
      width: 150,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Marka açarı",
      dataIndex: "BrandKey",
      key: "BrandKey",
      width: 150,
      render: (value) => (value ? value : "null"),
    },
    {
      title: "Əczaçılıq göstərişi açarı",
      dataIndex: "PharmacyAppointmentKey",
      key: "PharmacyAppointmentKey",
      width: 200,
      render: (value) => (value ? value : "null"),
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
    { title: "Name", dataIndex: "name", key: "name", width: 200 },
    { title: "Surname", dataIndex: "surname", key: "surname", width: 200 },
    { title: "Email", dataIndex: "email", key: "email", width: 250 },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (text) => (text ? new Date(text).toLocaleDateString() : ""),
    },
    {
      title: "Action",
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
            Edit
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
              Delete
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
      title: "NameAz",
      dataIndex: "NameAz",
      key: "NameAz",
      width: 200,
      ellipsis: true,
    },
    {
      title: "NameRu",
      dataIndex: "NameRu",
      key: "NameRu",
      width: 200,
    },
    { title: "View", dataIndex: "View", key: "View", width: 80, maxWidth: 200 },

    {
      title: "TextAz",
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
      title: "TextRu",
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
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      width: 200,
      render: (text) => (
        <div
          style={{
            maxHeight: "100px", // containerin maksimum hündürlüyü
            overflowY: "auto", // dikey scroll açılır
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
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      width: 100,
      maxWidth: 200,
      render: (text) =>
        text ? new Date(text).toLocaleDateString() : "Not set",
    },
    {
      title: "Action",
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
            Edit
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
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const faqColumns = [
    { title: "id", dataIndex: "id", key: "id", width: 30, fixed: "left" },
    {
      title: "questionAz",
      dataIndex: "questionAz",
      key: "questionAz",
      width: 100,
    },
    {
      title: "questionRu",
      dataIndex: "questionRu",
      key: "questionRu",
      width: 100,
    },
    { title: "answerAz", dataIndex: "answerAz", key: "answerAz", width: 100 },

    {
      title: "answerRu",
      dataIndex: "answerRu",
      key: "answerRu",
      width: 100,
    },

    {
      title: "Action",
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
            Edit
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
              Delete
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
                  loading={loading}
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
                  rules={[{ required: true, message: "NameAz is required" }]}
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

                <Form.Item name="Image" label="Image">
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
            destroyOnClose
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
            destroyOnClose
          >
            <Form form={formProduct} layout="vertical" onFinish={onAddProduct}>
              <Form.Item
                name="İmage"
                label="İmage"
                rules={[
                  { required: true, message: "İmage is required" },
                  {
                    pattern: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                    message:
                      "Please enter a valid image URL (png, jpg, jpeg, gif, svg)",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="NameAz"
                label="NameAz"
                rules={[
                  { required: true, message: "NameAz is required" },
                  {
                    pattern: /^[a-zA-Z0-9ğüşöçƏIİŞĞÜÖÇ\s\-]+$/i,
                    message:
                      "NameAz can only contain letters, numbers, spaces, and hyphens",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="Price"
                label="Price"
                rules={[{ required: true, message: "Price is required" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} step={0.01} />
              </Form.Item>

              <Form.Item
                name="NameRu"
                label="NameRu"
                rules={[
                  { required: true, message: "NameRu is required" },
                  {
                    pattern: /^[a-zA-Z0-9а-яё\s\-]+$/i,
                    message:
                      "NameRu can only contain letters, numbers, spaces, and hyphens",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="BrandAz"
                label="BrandAz"
                rules={[
                  { required: false, message: "BrandAz is required" },
                  {
                    pattern: /^[a-zA-Z0-9ğüşöçƏIİŞĞÜÖÇ\s\-]+$/i,
                    message:
                      "BrandAz can only contain letters, numbers, spaces, and hyphens",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="CountryAz"
                label="CountryAz"
                rules={[
                  { required: true, message: "CountryAz is required" },
                  {
                    pattern: /^[a-zA-ZğüşöçƏIİŞĞÜÖÇ\s\-]+$/i,
                    message:
                      "CountryAz can only contain letters, spaces, and hyphens",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="CountryRu"
                label="CountryRu"
                rules={[
                  { required: true, message: "CountryRu is required" },
                  {
                    pattern: /^[а-яё\s\-]+$/i,
                    message:
                      "CountryRu can only contain Russian letters, spaces, hyphens",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="Package"
                label="Package"
                rules={[{ required: true, message: "Package is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="FoodTypeAz"
                label="FoodTypeAz"
                rules={[{ required: false, message: "FoodTypeAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ProductTypeAz"
                label="ProductTypeAz"
                rules={[
                  { required: true, message: "ProductTypeAz is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="AgeAz"
                label="AgeAz"
                rules={[{ required: false, message: "AgeAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="İsSterilised"
                label="İsSterilised"
                rules={[
                  { required: false, message: "İsSterilised is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="AnimalTypeAz"
                label="AnimalTypeAz"
                rules={[
                  { required: true, message: "AnimalTypeAz is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="İngredientsAz"
                label="İngredientsAz"
                rules={[
                  { required: false, message: "İngredientsAz is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="isDiscount"
                label="Is Discount?"
                rules={[{ message: "Please select yes or no" }]}
              >
                <Radio.Group>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="Rating"
                label="Rating"
                rules={[
                  { required: true, message: "Rating is required" },
                  {
                    type: "number",
                    min: 0,
                    max: 5,
                    message: "Rating must be between 0 and 5",
                  },
                ]}
              >
                <InputNumber min={0} max={5} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="FoodTypeRu"
                label="FoodTypeRu"
                rules={[{ message: "FoodTypeRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ProductTypeRu"
                label="ProductTypeRu"
                rules={[
                  { required: true, message: "ProductTypeRu is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="AnimalTypeRu"
                label="AnimalTypeRu"
                rules={[
                  { required: true, message: "AnimalTypeRu is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="IngredientsRu"
                label="IngredientsRu"
                rules={[
                  { required: false, message: "IngredientsRu is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="AgeRu"
                label="AgeRu"
                rules={[{ message: "AgeRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="DietAndPreventionAz"
                label="DietAndPreventionAz"
                rules={[
                  {
                    message: "DietAndPreventionAz is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="DietAndPreventionRu"
                label="DietAndPreventionRu"
                rules={[
                  {
                    message: "DietAndPreventionRu is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="BaytarlıqPəhriziAz"
                label="BaytarlıqPəhriziAz"
                rules={[{ message: "BaytarlıqPəhriziAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="XəstəlikAz"
                label="XəstəlikAz"
                rules={[{ message: "XəstəlikAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="BaytarlıqPəhriziRu"
                label="BaytarlıqPəhriziRu"
                rules={[{ message: "BaytarlıqPəhriziRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="XəstəlikRu"
                label="XəstəlikRu"
                rules={[{ message: "XəstəlikRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="PharmacyAppointmentAz"
                label="PharmacyAppointmentAz"
                rules={[
                  {
                    message: "PharmacyAppointmentAz is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="PharmacyAppointmentRu"
                label="PharmacyAppointmentRu"
                rules={[
                  {
                    message: "PharmacyAppointmentRu is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="PercentOfDiscount"
                label="PercentOfDiscount"
                rules={[
                  { message: "PercentOfDiscount is required" },
                  {
                    type: "number",
                    min: 0,
                    max: 100,
                    message: "PercentOfDiscount must be between 0 and 100",
                  },
                ]}
              >
                <InputNumber min={0} max={100} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="InStock"
                label="InStock"
                rules={[{ required: true, message: "InStock is required" }]}
              >
                <Radio.Group>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="AromaAz"
                label="AromaAz"
                rules={[{ message: "AromaAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="MaterialAz"
                label="MaterialAz"
                rules={[{ message: "MaterialAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="TypeOfSandAz"
                label="TypeOfSandAz"
                rules={[{ message: "TypeOfSandAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="MaterialRu"
                label="MaterialRu"
                rules={[{ message: "MaterialRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="AromaRu"
                label="AromaRu"
                rules={[{ message: "AromaRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="TypeOfSandRu"
                label="TypeOfSandRu"
                rules={[{ message: "TypeOfSandRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="CookieTypeAz"
                label="CookieTypeAz"
                rules={[{ message: "CookieTypeAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="CookieTypeRu"
                label="CookieTypeRu"
                rules={[{ message: "CookieTypeRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="DogSizeAz"
                label="DogSizeAz"
                rules={[{ message: "DogSizeAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="DogSizeRu"
                label="DogSizeRu"
                rules={[{ message: "DogSizeRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ColorAz"
                label="ColorAz"
                rules={[{ message: "ColorAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ColorRu"
                label="ColorRu"
                rules={[{ message: "ColorRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="TypeOfAccessoriesAz"
                label="TypeOfAccessoriesAz"
                rules={[
                  {
                    message: "TypeOfAccessoriesAz is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="TypeOfCareProductsAz"
                label="TypeOfCareProductsAz"
                rules={[
                  {
                    message: "TypeOfCareProductsAz is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ProductSize"
                label="ProductSize"
                rules={[{ message: "ProductSize is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="TypeOfAccessoriesRu"
                label="TypeOfAccessoriesRu"
                rules={[
                  {
                    message: "TypeOfAccessoriesRu is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="TypeOfCareProductsRu"
                label="TypeOfCareProductsRu"
                rules={[
                  {
                    message: "TypeOfCareProductsRu is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="AnimalKey"
                label="AnimalKey"
                rules={[{ required: true, message: "AnimalKey is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="IngredientsKey"
                label="IngredientsKey"
                rules={[{ message: "IngredientsKey is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="FoodTypeKey"
                label="FoodTypeKey"
                rules={[{ message: "FoodTypeKey is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ProductTypeKey"
                label="ProductTypeKey"
                rules={[
                  { required: true, message: "ProductTypeKey is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="AgeKey"
                label="AgeKey"
                rules={[{ message: "AgeKey is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="DogSizeKey"
                label="DogSizeKey"
                rules={[{ required: false, message: "DogSizeKey is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="BrandKey"
                label="BrandKey"
                rules={[{ message: "BrandKey is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="PharmacyAppointmentKey"
                label="PharmacyAppointmentKey"
                rules={[
                  {
                    message: "PharmacyAppointmentKey is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Add Product
                </Button>
              </Form.Item>
            </Form>
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
                rules={[{ required: true, message: "NameAz is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Price"
                label="Price"
                rules={[{ required: true, message: "Price is required" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="BrandAz" label="BrandAz">
                <Input />
              </Form.Item>
              <Form.Item
                name="NameRu"
                label="NameRu"
                rules={[{ required: true, message: "NameRu is required" }]}
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
                label="InStock"
                rules={[{ required: false, message: "InStock is required" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
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
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="surname"
                label="Surname"
                rules={[{ required: true, message: "Surname is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Email is required" },
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
              <Form.Item name="Image" label="Image">
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
