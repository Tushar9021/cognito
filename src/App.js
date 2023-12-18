import { useEffect, useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes} from "react-router-dom" 
import { getSessionStorage } from './helper';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import ScannerPage from './pages/scannerPage';
import VerifyEmailForm from './components/verifyEmailForm';
import { ToastContainer } from 'react-toastify';
import { Spin } from 'antd';
import ChildParentPermission from './pages/childParentPermission';
import HomePage from './pages/homePage';

function App() {
  const [isAuth,setIsAuth]=useState(null);
  const [isLoading,setIsLoading]=useState(true);
  useEffect(()=>{
    const data= getSessionStorage();
    setIsAuth(data);
    setIsLoading(false)

  },[])
  return (
    <div style={{padding:10, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', alignContent:'center' }}>
    <BrowserRouter> 
    {isLoading ? <Spin size='large'/> :
    <Routes> 
       { 
         <>
         <Route  path="/" element={ <LoginForm/> } /> 
         <Route path="/register" element={<RegisterForm/> } />
         <Route path="/verifyEmail" element={<VerifyEmailForm /> } />
         <Route  path="/scanner" element={<ScannerPage /> } />
         <Route  path="/home" element={<HomePage /> } />
         <Route  path="/child-parent-permissions/:token" element={<ChildParentPermission/> } />
         </> 
          
       } 
    </Routes> 
}
     <ToastContainer />
    </BrowserRouter>  
    </div>
  );
}

export default App;
