import { useEffect, useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../services/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/authSlice";

interface SigninFormValues {
  email: string;
  password: string;
}

export interface ErrorResponse {
  status: number;
  data: {
    message: string;
  };
}

function Signin() {
  const [form] = Form.useForm();
  const [signin, { isSuccess, isError, error, data }] = useSigninMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const onFinish = (values: SigninFormValues) => {
    signin(values);
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message);
      dispatch(userLogin({ token: data.token, user: data.user }));
      localStorage.setItem(
        "Chat-Application",
        JSON.stringify({ token: data.token, user: data.user })
      );
      navigate("/messages");
    }

    if (isError) {
      if ((error as ErrorResponse).status == 403) {
        navigate(`/auth/verify-email?email=${email}`);
      }

      toast.error((error as ErrorResponse).data.message);
    }
  }, [isSuccess, data, isError]);

  return (
    <AuthLayout title="Signin">
      <div className="rounded-lg shadow bg-white">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="w-96 p-6"
        >
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

          <Form.Item>
            <Button block htmlType="submit" type="primary">
              Signin
            </Button>
          </Form.Item>
          <div className="text-sm font-semibold text-center">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-primary hover:text-primary">
              Sign Up
            </Link>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default Signin;
