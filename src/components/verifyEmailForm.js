import React, { useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { verificationCodePostApi, verifyEmailPostApi } from '../api';
import { toast } from 'react-toastify';

const VerifyEmailForm = () => {
    const { paramsEmail } = useParams()
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState(paramsEmail ? paramsEmail : null);
    const navigate = useNavigate();
    
    const onFinish = async (values) => {
        setLoading(true)
        verifyEmailPostApi(values)
            .then((res) =>{
                if(res?.status === 200){
                    toast.success(`${email} verify..!`,{
                        position: toast.POSITION.TOP_CENTER,
                        autoClose:5000
                    })
                    navigate('/')
                }else{
                    toast.error(res?.response?.data?.error,{
                        position: toast.POSITION.TOP_CENTER,
                        autoClose:5000
                      })
                }
            })
            .catch((err) => console.log(err))
        setLoading(false)
    };
    
    const resendVerificationCode =() =>{
        verificationCodePostApi({email:email}).then((res)=>{
            console.log(res,"Res")
            if(res?.status === 200){
                toast.success(`Verification Code Send to the ${email}`,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose:5000
                })
            }else{
                toast.error(res?.response?.data?.error,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose:5000
                  })
            }
        })
    }
    return (
    <Card className="login-form">
     <Form
      name="normal_login"
      layout="vertical"
      initialValues={{
        email: paramsEmail ? paramsEmail: null,
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
        <Input onChange={(e)=>{
            setEmail(e.target.value)
        }}/>
      </Form.Item>
      <Form.Item
        name="confirmationCode"
        label="Confirmation Code"
        
        rules={[
          {
            required: true,
            message: 'Please input your code!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item

      >
       <a onClick={()=>{
            resendVerificationCode()
       }}>Resend Verification Code</a>
      </Form.Item>
      <Form.Item>
        <Button  loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
         Submit 
        </Button>
          <Link to={'/'}>login now!</Link>
      </Form.Item>
    </Form>
   </Card>
    );
};
export default VerifyEmailForm;
