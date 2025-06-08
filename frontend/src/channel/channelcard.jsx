import React from "react";
import { useLocation } from "react-router";
const ChannelCard = () => {
    // const location = useLocation()
    // const data = location.state
    // console.log(data)
  return (
      <>
      <div className="flex justify-center  min-h-auto bg-gray-100 p-4 m-2">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-sm text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Sreeleela_interview.png/440px-Sreeleela_interview.png"
          alt="Channel Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-500"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">channel name</h2>
        <p className="text-gray-600">
        subscriberCount
        </p>
        <button
          type="submit"
          className="bg-blue-400 w-full mt-2 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          subscribed
        </button>       
                  
        </div>
              
      </div>
         <div className=" flex  justify-around">
        
         <div>videos</div>
         <div>notes</div>
         <div>pdf</div>     
              
              
     </div>  
      </>
      
  );
};

export default ChannelCard;
