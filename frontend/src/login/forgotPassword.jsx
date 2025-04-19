function ForgotPassword() {
    return (
      <>
   
        <div className="flex flex-col justify-center items-center min-h-screen bg-white/10 ">
          <form className="flex flex-col gap-4 w-full max-w-sm  rounded-2xl  shadow-xl   p-4">
            <label htmlFor="email"  className="font-semibold">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email..."
              className="px-4 py-2 border rounded"
            />
  
            <label htmlFor="password"  className="font-semibold">Password</label>
            <input
              type="text"
              id="password"
              placeholder="password..."
              className="px-4 py-2 border rounded"
            />
            <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Change Password
        </button>        
          </form>
        </div>
      </>
    );
  }
  
  export default ForgotPassword;
  