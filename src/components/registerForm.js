import React, { useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { registerPostApi } from '../api';
import { toast } from 'react-toastify';
const RegisterForm = () => {
    const navigate = useNavigate()
    const  [age,setAge]= useState(20)
    const onFinish = async (values) => {
        registerPostApi(values)
            .then((res) => {
              console.log(res,"res.")
              if(res?.status == 200){
                console.log(res,"Res")
                navigate('/verifyEmail', {
                  email: values.email,
              })
              }else{
                toast.error(res?.response?.data?.error,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose:5000
                })
              }
            })
    };
    
    return (  
    <Card className="login-form">
     <Form
      layout="vertical"
      name="normal_login"
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
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input placeholder="xyz@gmail.com" type='email' />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        rules={[
          {
            required: true,
            message: 'Please input your Location!',
          },
        ]}
      >
        <Input placeholder=" Ram Nivas, 42320"  />
      </Form.Item>
      <Form.Item
        name="age"
        label="Age"
        rules={[
          {
            required: true,
            message: 'Please input your Age!',
          },
        ]}
      >
        <Input placeholder="Ex.23"  type='number' onChange={(e)=>setAge(e?.target?.value)}/>
      </Form.Item>
      {
        age <= 18 && (
        <Form.Item
        name="parentEmail"
        label="Parent Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
          <Input placeholder="xyz@gmail.com" type='email' />
      </Form.Item>
        )
      }
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
        Register
        </Button>
        Or  <Link to={'/'}>login now!</Link>
      </Form.Item>
    </Form>
   </Card>
    );
};
export default RegisterForm;
