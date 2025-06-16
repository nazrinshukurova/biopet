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

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { products, loading, fetchProducts } = useProducts();

  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);

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
    const { data, error } = await supabase
      .from("Blogs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      message.error("Bloqlar yüklənərkən xəta baş verdi!");
    } else {
      setBlogs(data);
    }
    setLoadingBlogs(false);
  };

  const fetchFaqs = async () => {
    setLoadingFaqs(true);
    const { data, error } = await supabase
      .from("FAQ")
      .select("*")
      .order("created_at", { ascending: false });
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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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
      publish_date: values.publish_date
        ? values.publish_date.toISOString()
        : null,
      updated_at: new Date().toISOString(),
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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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

  const handleEditFaq = (record) => {
    setEditingFaq(record);
    setFaqEditModalVisible(true);
    formEditFaq.setFieldsValue(record);
  };


  const handleUpdateFaq = async (values) => {
    const faqData = {
      ...values,
      updated_at: new Date().toISOString(),
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
    { title: "ID", dataIndex: "id", key: "id", fixed: "left", width: 100 },
    { title: "NameAz", dataIndex: "NameAz", key: "NameAz", width: 200 },
    { title: "BrandAz", dataIndex: "BrandAz", key: "BrandAz", width: 200 },
    { title: "NameRu", dataIndex: "NameRu", key: "NameRu", width: 200 },
    {
      title: "CountryAz",
      dataIndex: "CountryAz",
      key: "CountryAz",
      width: 200,
    },
    {
      title: "CountryRu",
      dataIndex: "CountryRu",
      key: "CountryRu",
      width: 200,
    },
    { title: "Package", dataIndex: "Package", key: "Package", width: 200 },
    {
      title: "FoodTypeAz",
      dataIndex: "FoodTypeAz",
      key: "FoodTypeAz",
      width: 200,
    },
    {
      title: "ProductTypeAz",
      dataIndex: "ProductTypeAz",
      key: "ProductTypeAz",
      width: 200,
    },
    { title: "AgeAz", dataIndex: "AgeAz", key: "AgeAz", width: 200 },
    {
      title: "İsSterilised",
      dataIndex: "İsSterilised",
      key: "İsSterilised",
      width: 200,
    },
    {
      title: "AnimalTypeAz",
      dataIndex: "AnimalTypeAz",
      key: "AnimalTypeAz",
      width: 200,
    },
    { title: "Price", dataIndex: "Price", key: "Price", width: 200 },
    {
      title: "Action",
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
            Edit
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
              Delete
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
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "Title (AZ)", dataIndex: "title_az", key: "title_az", width: 250 },
    { title: "Title (RU)", dataIndex: "title_ru", key: "title_ru", width: 250 },
    { title: "Author", dataIndex: "author", key: "author", width: 150 },
    {
      title: "Published",
      dataIndex: "is_published",
      key: "is_published",
      width: 100,
      render: (published) => <Switch checked={published} disabled />,
    },
    {
      title: "Publish Date",
      dataIndex: "publish_date",
      key: "publish_date",
      width: 150,
      render: (text) =>
        text ? new Date(text).toLocaleDateString() : "Not set",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (text) => new Date(text).toLocaleDateString(),
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
    { title: "id", dataIndex: "id", key: "id", width: 80 },
    {
      title: "questionAz",
      dataIndex: "questionAz",
      key: "questionAz",
      width: 300,
    },
    {
      title: "questionRu",
      dataIndex: "questionRu",
      key: "questionRu",
      width: 300,
    },
    { title: "answerAz", dataIndex: "answerAz", key: "answerAz", width: 150 },
  
    {
      title: "answerRu",
      dataIndex: "answerRu",
      key: "answerRu",
      width: 100,
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
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
                  scroll={{ x: 1400 }}
                />
              </>
            )}

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
            visible={isProductModalVisible}
            onCancel={() => {
              setProductModalVisible(false);
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

              <Form.Item
                name="NameRu"
                label="NameRu"
                rules={[{ required: false, message: "NameRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="BrandAz"
                label="BrandAz"
                rules={[{ required: false, message: "BrandAz is required" }]}
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
                name="CountryRu"
                label="CountryRu"
                rules={[{ required: false, message: "CountryRu is required" }]}
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
                  { required: false, message: "ProductTypeAz is required" },
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
                  { required: false, message: "AnimalTypeAz is required" },
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
                name="İmage"
                label="İmage"
                rules={[{ required: false, message: "İmage is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="isDiscount"
                label="isDiscount"
                valuePropName="checked"
              >
                <Input type="checkbox" />
              </Form.Item>

              <Form.Item
                name="Rating"
                label="Rating"
                rules={[{ required: false, message: "Rating is required" }]}
              >
                <InputNumber min={0} max={5} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="FoodTypeRu"
                label="FoodTypeRu"
                rules={[{ required: false, message: "FoodTypeRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ProductTypeRu"
                label="ProductTypeRu"
                rules={[
                  { required: false, message: "ProductTypeRu is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="AnimalTypeRu"
                label="AnimalTypeRu"
                rules={[
                  { required: false, message: "AnimalTypeRu is required" },
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
                rules={[{ required: false, message: "AgeRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="DietAndPreventionAz"
                label="DietAndPreventionAz"
                rules={[
                  {
                    required: false,
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
                    required: false,
                    message: "DietAndPreventionRu is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="BaytarlıqPəhriziAz"
                label="BaytarlıqPəhriziAz"
                rules={[
                  {
                    required: false,
                    message: "BaytarlıqPəhriziAz is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="XəstəlikAz"
                label="XəstəlikAz"
                rules={[{ required: false, message: "XəstəlikAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="BaytarlıqPəhriziRu"
                label="BaytarlıqPəhriziRu"
                rules={[
                  {
                    required: false,
                    message: "BaytarlıqPəhriziRu is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="XəstəlikRu"
                label="XəstəlikRu"
                rules={[{ required: false, message: "XəstəlikRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="PharmacyAppointmentAz"
                label="PharmacyAppointmentAz"
                rules={[
                  {
                    required: false,
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
                    required: false,
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
                  { required: false, message: "PercentOfDiscount is required" },
                ]}
              >
                <InputNumber min={0} max={100} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="InStock"
                label="InStock"
                rules={[{ required: false, message: "InStock is required" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="AromaAz"
                label="AromaAz"
                rules={[{ required: false, message: "AromaAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="MaterialAz"
                label="MaterialAz"
                rules={[{ required: false, message: "MaterialAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="TypeOfSandAz"
                label="TypeOfSandAz"
                rules={[
                  { required: false, message: "TypeOfSandAz is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="MaterialRu"
                label="MaterialRu"
                rules={[{ required: false, message: "MaterialRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="AromaRu"
                label="AromaRu"
                rules={[{ required: false, message: "AromaRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="TypeOfSandRu"
                label="TypeOfSandRu"
                rules={[
                  { required: false, message: "TypeOfSandRu is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="CookieTypeAz"
                label="CookieTypeAz"
                rules={[
                  { required: false, message: "CookieTypeAz is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="CookieTypeRu"
                label="CookieTypeRu"
                rules={[
                  { required: false, message: "CookieTypeRu is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="DogSizeAz"
                label="DogSizeAz"
                rules={[{ required: false, message: "DogSizeAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="DogSizeRu"
                label="DogSizeRu"
                rules={[{ required: false, message: "DogSizeRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ColorAz"
                label="ColorAz"
                rules={[{ required: false, message: "ColorAz is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ColorRu"
                label="ColorRu"
                rules={[{ required: false, message: "ColorRu is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="TypeOfAccessoriesAz"
                label="TypeOfAccessoriesAz"
                rules={[
                  {
                    required: false,
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
                    required: false,
                    message: "TypeOfCareProductsAz is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ProductSize"
                label="ProductSize"
                rules={[
                  { required: false, message: "ProductSize is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="TypeOfAccessoriesRu"
                label="TypeOfAccessoriesRu"
                rules={[
                  {
                    required: false,
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
                    required: false,
                    message: "TypeOfCareProductsRu is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="AnimalKey"
                label="AnimalKey"
                rules={[{ required: false, message: "AnimalKey is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="IngredientsKey"
                label="IngredientsKey"
                rules={[
                  { required: false, message: "IngredientsKey is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="FoodTypeKey"
                label="FoodTypeKey"
                rules={[
                  { required: false, message: "FoodTypeKey is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="ProductTypeKey"
                label="ProductTypeKey"
                rules={[
                  { required: false, message: "ProductTypeKey is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="AgeKey"
                label="AgeKey"
                rules={[{ required: false, message: "AgeKey is required" }]}
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
                rules={[{ required: false, message: "BrandKey is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="PharmacyAppointmentKey"
                label="PharmacyAppointmentKey"
                rules={[
                  {
                    required: false,
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
              <Form.Item
                name="BrandAz"
                label="BrandAz"
                rules={[{ required: false, message: "BrandAz is required" }]}
              >
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
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
