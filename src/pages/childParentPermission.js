import React, { useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  childParentPermissionPostApi,
  verificationCodePostApi,
  verifyEmailPostApi,
} from '../api';
import { toast } from 'react-toastify';

const ChildParentPermission = () => {
  const { token } = useParams();
  const [isLoading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    childParentPermissionPostApi({ ...values, verificationToken: token })
      .then((res) => {
        console.log(res, 'res');
        if (res?.status === 200) {
          toast.success(
            `Access has been granted successfully for your child!`,
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000,
            },
          );
        } else {
          toast.error(res?.response?.data?.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  return (
    <Card style={{}}>
      <Form name="normal_login" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Enter your email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default ChildParentPermission;
