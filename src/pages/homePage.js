import { Button, Card, Image } from 'antd';
import React, { useState } from 'react';
import boy from '../assets/boy.jpg';
import parent from '../assets/parent.jpg';
import { getSessionStorage, removeSessionStorage } from '../helper';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { logoutPostApi } from '../api';
const HomePage = () => {
  const navigate = useNavigate();
  let data = getSessionStorage();
  const childComponent = () => (
    <div
      style={{ alignItems: 'center', alignSelf: 'center', textAlign: 'center' }}
    >
      <Image width={300} preview={false} src={boy} />
      <div>
        <span>logged in successfully!!</span>
        <br></br>
        <span>Now, you are able to play the games...</span>
      </div>
      <Button
        type="primary"
        style={{ width: '100%', marginTop: 6 }}
        onClick={async () => {
          await logoutPostApi({
            verificationToken: data?.data?.verificationToken,
            sub: data?.data?.idToken?.payload?.sub,
          });
          removeSessionStorage();
          toast.success('logged out successfully...!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1000);
        }}
      >
        Log Out
      </Button>
    </div>
  );
  const parentComponent = () => (
    <div
      style={{ alignItems: 'center', alignSelf: 'center', textAlign: 'center' }}
    >
      <Image preview={false} width={200} src={parent} />
      <div>
        <span>logged in successfully!!</span>
        <br></br>
        <span>you are a parent user</span>
      </div>
      <Button
        type="primary"
        style={{ width: '100%', marginTop: 6 }}
        onClick={() => {
          removeSessionStorage();
          toast.success('logged out successfully...!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1000);
        }}
      >
        Log Out
      </Button>
    </div>
  );
  return (
    <Card style={{ display: 'flex', alignItems: 'center' }}>
      {!data?.data?.idToken?.payload?.['custom:parentEmail']
        ? parentComponent()
        : childComponent()}
    </Card>
  );
};
export default HomePage;
