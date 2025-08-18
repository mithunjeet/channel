// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// import { createBrowserRouter , createRoutesFromElements, Route , RouterProvider } from 'react-router'
// // import { Route } from 'react-router'

// import Login from './login/Login.jsx'
// import CreateAccount from './login/createAccount.jsx'
// import OTPVerify from './login/otpverify.jsx'
// import ResendOtp from './login/resendOtp.jsx'
// import MainPage from './mainpage/MainPage.jsx'
// import SettingsPage from './setting/settingPage.jsx'
// import ForgotPassword from './login/forgotPassword.jsx'
// import DefaultPlaylist from './playlist/PlaylistDefault.jsx'
// import UploadVideo from './video/upload.jsx'
// import AllChannel from './channel/AllChannel.jsx'
// import JobSeekerProfile from './profile/User.Profile.jsx'
// import ReportUserForm from './componet_general/Report.jsx'
// import RateUserForm from './componet_general/Rating.jsx'
// import Comment from './componet_general/Comment.jsx'
// import JobSeekerDashboard from './mainpage/jobSeekerDashbard.jsx'
// import JobApplicationForm from './mainpage/jobApplication.jsx'
// import JobApplicationPgae from './mainpage/jobApplicationPage.jsx'
// const router = createBrowserRouter(createRoutesFromElements(
//   <Route>
//   <Route path='/' element={<Login />} />
//   <Route path='/forgotPassword' element={ <ForgotPassword/>} />  
//   <Route path='/register'  element = {<CreateAccount/>} />
//   <Route path='/verifyOtp' element = {<OTPVerify/>} /> 
//   <Route path='/resendOtp' element={<ResendOtp />} />
    
//   <Route path="/mainpage" element={<MainPage />}>
//   <Route path='jobApplicant' element={<JobApplicationPgae/> } />    
//   <Route path="userprofile" element={<JobSeekerProfile/>} />
//   <Route path='report/:id' element={<ReportUserForm />}/>
//   <Route path='rate/:id' element={<RateUserForm />} />
//   <Route path='comment/:id' element={<Comment />} />   
//   <Route path='applyjob' element={<JobApplicationForm/>} />
//   <Route path='dashboard' element={<JobSeekerDashboard />} />
//   <Route path="setting" element={<SettingsPage />} />        
//   <Route path='otherchannel' element={ <AllChannel/>} />
//   <Route path="playlist" element={<DefaultPlaylist />}>
//   <Route path="upload" element={<UploadVideo />} />
//   </Route>
//   </Route>

  
//   </Route>
// ))

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider  router={router}/>
   
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Login from './login/Login.jsx';
import CreateAccount from './login/createAccount.jsx';
import OTPVerify from './login/otpverify.jsx';
import ResendOtp from './login/resendOtp.jsx';
import MainPage from './mainpage/MainPage.jsx';
import SettingsPage from './setting/settingPage.jsx';
import ForgotPassword from './login/forgotPassword.jsx';
import DefaultPlaylist from './playlist/PlaylistDefault.jsx';
import UploadVideo from './video/upload.jsx';
import AllChannel from './channel/AllChannel.jsx';
import JobSeekerProfile from './profile/User.Profile.jsx';
import ReportUserForm from './componet_general/Report.jsx';
import RateUserForm from './componet_general/Rating.jsx';
import Comment from './componet_general/Comment.jsx';
import JobSeekerDashboard from './mainpage/jobSeekerDashbard.jsx';
import JobApplicationForm from './mainpage/jobApplication.jsx';
import JobApplicationPage from './mainpage/jobApplicationPage.jsx';
import ProtectedRoute from "./mainpage/middleware.jsx";
import ForgotPasswordOtpVerify from './login/forgotPasswordOtpVerify.jsx';
import LoadJobAlreadyToUserLocation from './mainpage/loadAlreadyToUserLocation.jsx';
import AllJobOfUserApplied from './mainpage/AllJobOfUserApplied.jsx';
import VideoResults from './video/Videopage.jsx';
import WatchVideo from './video/Watchvideo.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
     
      <Route path='/login' element={<Login />} />
      <Route path='/forgotPassword' element={<ForgotPassword />} />
      <Route path='/register' element={<CreateAccount />} />
      <Route path='/verifyOtp' element={<OTPVerify />} />
      <Route path='/resendOtp' element={<ResendOtp />} />
      <Route path='/otpverifyAfterForgetPassword' element={<ForgotPasswordOtpVerify />} />

   
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      >
        <Route path='chat' element={<div className='flex  justify-center  items-center'>
            <div className='text-green-500'> currently working  deployed soon...</div>
        </div>} />
        <Route path='manageJob' element={<AllJobOfUserApplied />} />
        <Route path='loadJob' element={<LoadJobAlreadyToUserLocation />} />
        <Route path='jobApplicant' element={<JobApplicationPage />} />
        <Route path='videoresult' element={< VideoResults/>} />
        <Route path='watch/:id' element={<WatchVideo/>} />
        <Route path='userprofile' element={<JobSeekerProfile />} />
        <Route path='report/:id' element={<ReportUserForm />} />
        <Route path='rate/:id' element={<RateUserForm />} />
        <Route path='comment/:id' element={<Comment />} />
        <Route path='applyjob' element={<JobApplicationForm />} />
        <Route path='dashboard' element={<JobSeekerDashboard />} />
        <Route path='setting' element={<SettingsPage />} />
        <Route path='otherchannel' element={<AllChannel />} />
        
        <Route path='playlist' element={<DefaultPlaylist />}>
        <Route path='upload' element={<UploadVideo />} />
        </Route>
        </Route>

      
       <Route
        path="*"
        element = {
          <div className="flex justify-center items-center h-screen">
            <div className="text-red-500 text-xl font-semibold">
              SORRY PAGE NOT FOUND ... 404 🤔💭
            </div>
          </div>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
