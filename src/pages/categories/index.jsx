import { Button, Form, Input, Modal, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/api";
import { useForm } from "antd/es/form/Form";

const Categories = () => {
  const [data, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();

  const columns = [
    {
      title: "Name",
      dataIndex: "category_name",
      key: "category_name",
      render: (category_name) => (
        <>
          <span>{category_name}</span>
        </>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      
      const res = await api.post("/category/create", value);
      console.log("Created category:", res.data);
    } else {
      
      const res = await api.put(`/category/${value._id}`, value);
      console.log("Updated category:", res.data);
    }

    fetchcategories();
    form.resetFields(); 
    setIsModalOpen(false); 
  };

  const handleDelete = async (_id) => {
    try {
      const res = await api.delete(`category/${_id}`);
      console.log("Deleted category:", res.data);

      fetchcategories(); 
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const fetchcategories = async () => {
    try {
      const res = await api.post("/categories");
      console.log(res.data);

      if (Array.isArray(res.data.data)) {
        setDataSource(res.data.data);
      } else {
        setDataSource([]);
        console.error("Dữ liệu không hợp lệ:", res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchcategories();
  }, []);

  return (
    <div>
      <div className="py-5 flex justify-center">
        <span className="text-4xl">Manage Categories</span>
      </div>
      <div className="p-3 flex justify-end">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add New Category
        </Button>
      </div>
      <div className="drop-shadow-lg">
        <Table dataSource={data} columns={columns} />
      </div>
      <Modal title="Add new Category" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Name" name="category_name" rules={[{ required: true, message: "Please input Category name!" }]}>
            <Input placeholder="Please input Category name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input Category description!" }]}
          >
            <Input placeholder="Please input Category description" />
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

export default Categories;
