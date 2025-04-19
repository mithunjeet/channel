import React, { useState } from "react";

export default function SettingsPage() {
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [email , setEmail] = useState("")
  const handlePasswordChange = (e) => {
    e.preventDefault();
    // call your API to update password here
    console.log("New password:", password);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleAvatarUpload = (e) => {
    e.preventDefault();
    if (avatar) {
     
      console.log("Uploading avatar:", avatar.name);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Account Settings</h1>

     
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
          onChange={handleAvatarChange}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Avatar
        </button>
      </form>
    </div>
  );
}
