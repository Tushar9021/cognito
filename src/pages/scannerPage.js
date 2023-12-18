import QRCode from 'react-qr-code';
import { getSessionStorage, removeSessionStorage } from '../helper';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { accountVerificationPostApi } from '../api';

const ScannerPage = () => {
  const [qrValue, setQrValue] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    let user = getSessionStorage();
    setQrValue(
      `https://congnito-server.onrender.com/child-parent-permissions/${user?.data?.verificationToken}`,
    );
    const intervalId = setInterval(async () => {
      await accountVerificationPostApi({
        verificationToken: user?.data?.verificationToken,
        sub: user?.data?.idToken?.payload?.sub,
      })
        .then((res) => {
          if (res?.status === 200) {
            navigate('/home');
          }
        })
        .catch((err) => console.log(err));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        maxWidth: '70%',
        width: '100%',
        margin: 4,
        display: 'flex',
        alignItems: 'center',
        // textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <QRCode
        style={{ height: 'auto', maxWidth: '100%', width: 300 }}
        value={qrValue}
        viewBox={`0 0 256 256`}
      />
      <div style={{ width: 300 }}>
        <Button
          type="primary"
          style={{ width: '100%', marginTop: 12 }}
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
          Back
        </Button>
      </div>
      <div>
        <div class="info">
          <strong></strong> Kindly request your parent to scan the QR code using
          a valid email address. Once the scan is complete and your parent
          grants access, the page will automatically redirect to the game page.
          Please refrain from refreshing the page and wait until the QR code has
          been successfully scanned
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
