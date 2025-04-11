import { useEffect, useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { Button, Form, Input } from "antd";
import { convertSecondsToTime } from "../../utils/time";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../../services/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface VerifyEmailFormValues {
  otp: string;
}

export interface ErrorResponse {
  status: number;
  data: {
    message: string;
  };
}

const RESEND_TIME = 120;

function VerifyEmail() {
  const [form] = Form.useForm();
  const [timeLeft, setTimeLeft] = useState(RESEND_TIME);
  const [isTimeExpired, setIsTimeExpired] = useState(false);
  const [sendOTP] = useSendOTPMutation();
  const [
    verifyOTP,
    {
      isSuccess: isVerifyOTPSuccess,
      isError: isVerifyOTPError,
      error: verifyOTPError,
      data: verifyOTPData,
    },
  ] = useVerifyOTPMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const otpSent = queryParams.get("otpSent");

  const onFinish = async (values: VerifyEmailFormValues) => {
    await verifyOTP({ email, otp: values.otp });
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResendOTP = async () => {
    try {
      await sendOTP({ email });
      toast.success("OTP has been resent to your email.");
      setTimeLeft(RESEND_TIME);
      setIsTimeExpired(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  useEffect(() => {
    if (isVerifyOTPSuccess) {
      toast.success(verifyOTPData.message);
      navigate("/auth/signin");
    }

    if (isVerifyOTPError) {
      const typedError = verifyOTPError as ErrorResponse;
      toast.error(typedError.data.message);
    }
  }, [isVerifyOTPSuccess, isVerifyOTPError]);

  useEffect(() => {
    const sendInitialOTP = async () => {
      try {
        await sendOTP({ email });
        toast.success("OTP has been sent to your email.");
      } catch (error) {
        toast.error("Failed to send OTP. Please try again.");
      }
    };

    if (email && otpSent != "true") {
      sendInitialOTP();
    }
  }, [email]);

  return (
    <AuthLayout title="Verify Your Email">
      <div className="rounded-lg shadow bg-white w-96 p-4 text-center">
        <div className="text-xl mb-2 font-semibold">Verify Your Email</div>
        <div className="text-slate-600 text-sm">
          We have sent a verification link to your email address. Please check
          your inbox. Enter the OTP here:
        </div>
        <Form
          form={form}
          className="w-full text-center mt-4"
          onFinish={onFinish}
        >
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Please enter the OTP" }]}
          >
            <Input.OTP />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button htmlType="submit" type="primary" block>
              Verify Your Email
            </Button>
          </Form.Item>

          <div className="flex justify-between items-center text-xs mt-0">
            <Button
              className="text-primary font-semibold border-none bg-none px-2 shadow-none"
              disabled={!isTimeExpired}
              onClick={handleResendOTP}
            >
              Resend Verification Email
            </Button>
            <div>Time remaining: {convertSecondsToTime(timeLeft)}</div>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default VerifyEmail;
