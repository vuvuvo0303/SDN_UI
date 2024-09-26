import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { useForm } from "antd/es/form/Form";

const Product = () => {
  const [data, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [categories, setCategories] = useState([]); 
  const columns = [
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
      render: (category_name) => <span>{category_name}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id, record) => (
        <Space>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            onClick={() => {
              form.setFieldsValue(record); 
              setIsModalOpen(true); 
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    if (!value._id) {
      
      const res = await api.post("/product/create", value);
      console.log("Created product:", res.data);
    } else {
    
      const res = await api.put(`/product/${value._id}`, value);
      console.log("Updated product:", res.data);
    }

    fetchProducts();
    form.resetFields(); 
    setIsModalOpen(false); 
  };

  const handleDelete = async (_id) => {
    try {
      const res = await api.delete(`product/${_id}`);
      console.log("Deleted product:", res.data);

      fetchProducts(); 
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.post("/categories");
      if (Array.isArray(res.data.data)) {
        setCategories(res.data.data); 
      } else {
        setCategories([]);
        console.error("Dữ liệu không hợp lệ:", res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.post("/products");
      console.log(res.data);

      if (Array.isArray(res.data.data)) {
        const productsWithCategoryName = res.data.data.map((product) => {
          
          const category = categories.find((cat) => cat._id === product.category_id);
          return {
            ...product,
            category_name: category ? category.category_name : "Unknown Category",
          };
        });
        setDataSource(productsWithCategoryName); 
      } else {
        setDataSource([]);
        console.error("Dữ liệu không hợp lệ:", res.data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); 
  }, []);

  useEffect(() => {
    fetchProducts(); 
  }, [categories]);

  return (
    <div>
      <div className="py-5 flex justify-center">
        <span className="text-4xl">Manage Product</span>
      </div>
      <div className="p-3 flex justify-end">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add New Product
        </Button>
      </div>
      <div className="drop-shadow-lg">
        <Table dataSource={data} columns={columns} />
      </div>
      <Modal title="Add new Product" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input Product name!" }]}>
            <Input placeholder="Please input Product name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input Product description!" }]}
          >
            <Input placeholder="Please input Product description" />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              placeholder="Select Category"
              options={categories.map((category) => ({
                value: category._id,
                label: category.category_name, 
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input Product price!" }]}
          >
            <Input placeholder="Please input Product price" />
          </Form.Item>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <div className="flex justify-end">
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
