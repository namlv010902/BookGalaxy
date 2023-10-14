
import { Collapse, Space } from 'antd';
import "./Menu.css"
import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Panel } = Collapse;

const Aside = () => {
  const handlePanelChange = (key: any) => {
    console.log('Expanded panels:', key);
  };

  return (
    <div className="aside-main">
      <Collapse accordion onChange={handlePanelChange} style={{ width: "100%" }}>
        <Link to="/admin" className='admin'> <AppstoreOutlined style={{ marginRight: "10px" }} /> Dashboard</Link>

        <Panel header={
          <Space>
            <AppstoreOutlined />
            Products
          </Space>
        } key="3">
          <ul>
            <Link to="./products">List products</Link> <br />
            <Link to="./product/add">Create product</Link>
          </ul>
        </Panel>
        <Panel header={
          <Space>
            <AppstoreOutlined />
            Categories
          </Space>
        } key="2">
          <ul>
            <Link to="./categories">List categories</Link> <br />
            <Link to="./category/add">Create category</Link>
          </ul>
        </Panel>
        <Panel header={
          <Space>
            <AppstoreOutlined />
            Brand
          </Space>
        } key="4">
          <ul>
          <Link to="./brands">List brands</Link> <br />
          <Link to="./brand/add">Create brand</Link> <br />
          </ul>
        </Panel>
        <Panel header={
          <Space>
            <AppstoreOutlined />
            Size
          </Space>
        } key="5">
          <ul>
          <Link to="./sizes">List sizes</Link> <br />
          <Link to="./size/add">Create size</Link> <br /> 
          </ul>
        </Panel>
        <Panel header={
          <Space>
            <AppstoreOutlined />
            Order
          </Space>
        } key="6">
          <ul>
            <Link to="/admin/orders">List orders</Link>
          </ul>
        </Panel>
        <Panel header={
          <Space>
            <AppstoreOutlined />
            Comments
          </Space>
        } key="7">
          <ul>
          <Link to="/admin/comments">List comments</Link>    
          </ul>
        </Panel>
        <Panel header={
          <Space>
            <AppstoreOutlined />
            Users
          </Space>
        } key="8">
          <ul>
            <Link to="/admin/users">List users</Link>

          </ul>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Aside;