import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import * as fetchModel from "../../lib/fetchModelData";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
    const navigate = useNavigate();

    function onFinish(values) {
        const { remember, ...rest } = values;

        const fetchApi = async () => {
            try {
                const res = await fetchModel.ApiUserLogin(rest);

                if (res.status === 200) {
                    message.success("Đăng nhập thành công!");
                    Cookies.set("user", JSON.stringify(res.data.user));
                    navigate("/");
                } else {
                    message.error(
                        res.message || "Tài khoản hoặc mật khẩu không đúng"
                    );
                }
            } catch (error) {
                message.error(
                    error.response?.data?.message ||
                        "Lỗi máy chủ. Vui lòng thử lại sau."
                );
            }
        };
        fetchApi();
    }
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f2f5",
            }}
        >
            <Form
                name="login"
                style={{
                    width: "30%",
                    border: "1px solid #ddd",
                    backgroundColor: "#CDD5DB",
                    padding: 40,
                    borderRadius: "15px",
                }}
                onFinish={onFinish}
                size="large"
            >
                <Form.Item
                    name="login_name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: 18, // font size cho checkbox và link
                        }}
                    >
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox style={{ fontSize: 18 }}>
                                Remember me
                            </Checkbox>
                        </Form.Item>
                        <a href="" style={{ fontSize: 18 }}>
                            Forgot password
                        </a>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        style={{ fontSize: 22, height: 48 }}
                    >
                        Log in
                    </Button>
                    <div style={{ fontSize: 18, marginTop: 8 }}>
                        or <a href="/register">Register now!</a>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
