import { useState } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import anh  from "../../assets/anh.jpg";
const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/dashboard/${key}`}> {label} </Link>,
  };
}
const items = [
  getItem("Catagories", "category", <PieChartOutlined />),
  getItem("Product", "product", <DesktopOutlined />),
];
const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <div
          className=" bg-white p-3"
          
        >
          <div className="flex justify-end items-center ">
            <Avatar size={40} src={anh}/>
          </div>
        </div>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className=""
            // style={{
            //   padding: 24,
            //   minHeight: 360,
            //   background: colorBgContainer,
            //   borderRadius: borderRadiusLG,
            // }}
          >
            <Outlet />
            {/* hiển thị children */}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashBoard;
