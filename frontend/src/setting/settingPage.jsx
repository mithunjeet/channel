import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useRef } from "react";
export default function SettingsPage() {
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("")
  const [cookies, setCookies] = useCookies()
  const [isUploading , setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const [callStop , setCallStop]= useState(false)
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("please fill all field correctly")
    }
    
    const confirm = window.confirm("Are you sure want to change passowrd ?")
    if (!confirm) return;  
    try {
      
      const { data } = await axios.patch(
        `${import.meta.env.VITE_URL}/user/changePassword`,
         {email, password},{
         
          headers: {
            Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`,
          }
        }
      );
    console.log(data)
    alert(data)
    } catch (error) {
      console.log(error)
      alert(error?.response?.data);
    } finally {
      setEmail("")
      setPassword("")          
    }

  };

const handleAvatarChange = (e) => {
  setAvatar(e.target.files[0]);
};

const handleAvatarUpload = async (e) => {
  e.preventDefault()

  if (!avatar) {
    alert("File has not  selected")
    return;
  }
    const handleAvatarReset = () => {
    setAvatar(null); // clear preview
    if (fileInputRef.current) {
      fileInputRef.current.value = "" 
    }
  };
  const formData = new FormData()
  formData.append("avatar", avatar)

  try {
    setIsUploading(true)
    const { data } = await axios.post(
      `${import.meta.env.VITE_URL}/user/uploadAvatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`,
        },
      }
    );
    console.log(data);
    alert(data);
  } catch (error) {
    console.log(error);
    alert(error?.response?.data || "Upload failed");
  } finally {
    handleAvatarReset()
    setIsUploading(false)
  }
}


  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Account Settings</h1>
      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={callStop}
            onChange={() => setCallStop(!callStop)}
            className={callStop? "accent-red-600  h-6 w-6" : "" }
          />
          <span className="text-sm text-gray-700 font-semibold">{ callStop ? "make call allowed on you phone" : "stop call on you phone" }</span>
        </label>
      </div>

     
        <form onSubmit={handlePasswordChange} className="mb-10">
        <label className="block text-sm font-medium mb-1"  htmlFor="email">email</label>
        <input
          id="email"          
          type="email"
          placeholder="email..."        
          className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none focus:ring"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />        
        <label className="block text-sm font-medium mb-1"  htmlFor="password">New Password</label>
        <input
           id="password"       
           type="text"
           placeholder="Password..."       
          className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none focus:ring"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>

      <hr className="my-6 border-2 border-gray-300" />

      <form onSubmit={handleAvatarUpload}>
        <label className="block text-sm font-medium mt-12  mb-1 "  htmlFor="avatar">Upload Avatar</label>
         <input
          id="avatar"         
          type="file"
          accept="image/*"
          className="mb-3"
          ref={fileInputRef}
          onChange={handleAvatarChange}
        />
        <button
          type="submit"
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Update Avatar"}
        </button>
      </form>
    </div>
  );
}
