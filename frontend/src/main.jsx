import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter , createRoutesFromElements } from 'react-router'
import { Route } from 'react-router'
import { Router, RouterProvider } from 'react-router'
import Login from './login/Login.jsx'
import CreateAccount from './login/createAccount.jsx'
import OTPVerify from './login/otpverify.jsx'
import ResendOtp from './login/resendOtp.jsx'
import MainPage from './mainpage/MainPage.jsx'
import ChannelCard from './channel/channelcard.jsx'
import SettingsPage from './setting/settingPage.jsx'
import ForgotPassword from './login/forgotPassword.jsx'
import DefaultPlaylist from './playlist/PlaylistDefault.jsx'
import UploadVideo from './video/upload.jsx'
import AllChannel from './channel/AllChannel.jsx'
const router = createBrowserRouter(createRoutesFromElements(
  <Route>
  <Route path='/' element={<Login />} />
  <Route path='/forgotPassword' element={ <ForgotPassword/>} />  
  <Route path='/register'  element = {<CreateAccount/>} />
  <Route path='/verifyOtp' element = {<OTPVerify/>} /> 
  <Route path='/resendOtp' element={<ResendOtp />} />
    
  <Route path="/mainpage" element={<MainPage />}>
  <Route path="channel" element={<ChannelCard />} />
  <Route path="setting" element={<SettingsPage />} />
  <Route path='otherchannel' element={ <AllChannel/>} />
  <Route path="playlist" element={<DefaultPlaylist />}>
  <Route path="upload" element={<UploadVideo />} />
  </Route>
      
    
  </Route>

  
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider  router={router}/>
   
  </StrictMode>,
)
