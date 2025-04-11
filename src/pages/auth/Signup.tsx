import { useEffect, useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../services/authApi";
import toast from "react-hot-toast";

interface SignupFormValues {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorResponse {
  message: string;
}

function Signup() {
  const [form] = Form.useForm();
  const [signup, { isLoading, isSuccess, isError, error, data }] =
    useSignupMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onFinish = (values: SignupFormValues) => {
    const { fullname, email, username, password } = values;

    signup({ fullname, email, username, password });
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as { data: ErrorResponse }).data.message);
    }

    if (isSuccess) {
      toast.success(data.message);
      navigate(`/auth/verify-email?email=${email}&otpSent=true`);
    }
  }, [isSuccess, isError]);

  return (
    <AuthLayout title="Signup">
      <div className="rounded-lg shadow bg-white">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="w-96 p-6"
        >
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[
              { required: true, message: "Please enter your full name" },
              { min: 3, message: "Full name must be at least 3 characters" },
              { max: 20, message: "Full name must be less than 20 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: "Please enter a username" },
              { min: 3, message: "Username must be at least 3 characters" },
              { max: 12, message: "Username must be less than 12 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit" type="primary" disabled={isLoading}>
              Signup
            </Button>
          </Form.Item>
          <div className="text-sm font-semibold text-center">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-primary hover:text-primary">
              Sign In
            </Link>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default Signup;
