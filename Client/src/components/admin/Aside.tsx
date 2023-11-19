
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