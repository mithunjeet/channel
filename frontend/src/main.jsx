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
import SettingsPage from './setting/settingPage.jsx'
import ForgotPassword from './login/forgotPassword.jsx'
import DefaultPlaylist from './playlist/PlaylistDefault.jsx'
import UploadVideo from './video/upload.jsx'
import AllChannel from './channel/AllChannel.jsx'
import JobSeekerProfile from './profile/User.Profile.jsx'
import ReportUserForm from './componet_general/Report.jsx'
import RateUserForm from './componet_general/Rating.jsx'
import Comment from './componet_general/Comment.jsx'
import JobSeekerDashboard from './mainpage/jobSeekerDashbard.jsx'
import JobApplicationForm from './mainpage/jobApplication.jsx'
const router = createBrowserRouter(createRoutesFromElements(
  <Route>
  <Route path='/' element={<Login />} />
  <Route path='/forgotPassword' element={ <ForgotPassword/>} />  
  <Route path='/register'  element = {<CreateAccount/>} />
  <Route path='/verifyOtp' element = {<OTPVerify/>} /> 
  <Route path='/resendOtp' element={<ResendOtp />} />
    
  <Route path="/mainpage" element={<MainPage />}>
  <Route path="userprofile" element={<JobSeekerProfile/>} />
  <Route path='report' element={<ReportUserForm />}/>
  <Route path='rate' element={<RateUserForm />} />
  <Route path='comment' element={<Comment />} />   
  <Route path='applyjob' element={<JobApplicationForm/>} />
  <Route path='dashboard' element={<JobSeekerDashboard />} />
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
