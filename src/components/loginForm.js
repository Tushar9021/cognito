import React, { useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ForgotPasswordPostApi, loginPostApi } from '../api';
import {  toast } from 'react-toastify';
import { setSessionStorage } from '../helper';
const LoginForm = () => {
    const [isLoading, setLoading] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
    const navigate = useNavigate();
    
    const onFinish = async (values) => {
        setLoading(true)
        if (isForgot) {
            ForgotPasswordPostApi(values)
                .then(res => {
                    console.log(res, "res")
                })
                .catch(err => {
                    console.log(err, "login form")
                    setLoading(false)
                })
        } else {
            loginPostApi(values)
                .then(res => {
                  if(res?.status === 200)
                  {
                    toast.success('login successful...!',{
                      position: toast.POSITION.TOP_CENTER,
                    })
                    setSessionStorage(res?.data);
                    setLoading(false)
                    !res?.data?.data?.idToken?.payload?.['custom:parentEmail'] ?
                    navigate('/home',{ replace: true }) : navigate('/scanner',{ replace: true })
                    
                  }else{
                    toast.error(res?.response?.data?.error,{
                      position: toast.POSITION.TOP_CENTER,
                      autoClose:5000
                    })
                    setLoading(false)
                  }
                })
                .catch(err => {
                    toast.error(err.message)
                    setLoading(false)
                })
        }
    };
    
    return (
    <Card className="login-form">
     <Form
      name="normal_login"
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Eamil!',
          },
        ]}
      >
        <Input placeholder="Lalit" />
      </Form.Item>
      <Form.Item
        name={isForgot? "oldPassword" : "password" }
        label={isForgot? "Old Password" : "Password" }
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        {isForgot ?
         <Form.Item 
         name="newPassword"
         label="New Password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]} >
          <Input.Password
          type="password"
          placeholder="Password"
        />
        </Form.Item> :
        <div style={{
          display:'flex',
          justifyContent:'space-between'
        }}>
          <a  onClick={()=>setIsForgot(!isForgot)}>
          Forgot password
        </a>
        
        <Link to={'/verifyEmail'}>Verify Email</Link>
        </div>
        }
      </Form.Item>
      <Form.Item>
        <Button  loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or  <Link to={'/register'}>register now!</Link>
      </Form.Item>
    </Form>
   </Card>
    );
};
export default LoginForm;
