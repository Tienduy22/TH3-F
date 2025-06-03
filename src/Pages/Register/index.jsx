import React from "react";
import { Form, Input, Button, message } from "antd";
import * as fetchModel from "../../lib/fetchModelData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    function onFinish(values) {
        const { confirm, ...rest } = values;

        const fetchApi = async () => {
            try {
                const res = await fetchModel.ApiUserRegister(rest);

                if (res.status === 200) {
                    message.success("Đăng ký thành công!");
                    navigate("/");
                } else {
                    message.error(
                        res.message || "Email đã tồn tại"
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
                display: "flex",
                justifyContent: "center",
                paddingTop: "40px",
                paddingBottom: "40px",
                backgroundColor: "#f0f2f5",
                minHeight: "80vh",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    maxWidth: "600px",
                    paddingRight: "100px",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
                    Register
                </h2>

                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="login_name"
                        label="Login Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your login name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="first_name"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your first name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your last name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[
                            {
                                required: true,
                                message: "Please input your location!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: "Please input your description!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="occupation"
                        label="Occupation"
                        rules={[
                            {
                                required: true,
                                message: "Please input your occupation!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;
