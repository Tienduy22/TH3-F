import { Layout } from "antd";
import TopBar from "../TopBar";
import UserList from "../UserList";
import { Outlet } from "react-router-dom"
import Cookies from 'js-cookie';


const { Header, Content, Sider } = Layout;

const AppLayout = () => {
    const token = Cookies.get("token")
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ padding: 0 }}>
                <TopBar />
            </Header>
            <Layout>
                <Sider
                    width={300}
                    style={{ background: "#fff", padding: "16px" }}
                >
                    {token ? (<UserList />) :(<></>)}
                </Sider>
                <Content
                    style={{
                        margin: "16px",
                        background: "#fff",
                        padding: "16px",
                    }}
                >
                    <Outlet /> {/* Thêm dòng này để render route con */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;