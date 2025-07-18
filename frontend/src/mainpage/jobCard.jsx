function JobCard({ doc }) {
  const user = doc?.alldetails?.[0] || {};

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition-all duration-300 text-sm">
      <div className="p-4 space-y-3">

    
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || "https://tse1.mm.bing.net/th?id=OIP.pHKwbwSwKlX0zCMXPnir5wHaLH&pid=Api&P=0&h=180"}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <h2 className="font-semibold text-gray-800 text-sm truncate max-w-[120px]">{user?.username}</h2>
             
              <p className="text-gray-500">{doc?.role}</p>
            </div>
          </div>
          <div className="flex space-x-1 text-lg">
            <button title="Call" className="hover:text-blue-600">📞</button>
            <button title="Message" className="hover:text-green-600">✉️</button>
          </div>
        </div>

     
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-xs">
          <div><strong>Village:</strong> {doc?.village}</div>
          <div><strong>District:</strong> {doc?.district}</div>
          <div><strong>State:</strong> {doc?.state}</div>
          <div><strong>Work Range:</strong> {doc?.workRangeKm} km</div>
          <div><strong>Current Wages:</strong> ₹{doc?.currentWages}</div>
          <div><strong>Expected Wages:</strong> ₹{doc?.expectedWages}</div>
        </div>

   
        <div className="text-gray-800 text-xs">
          <strong>Commitment:</strong> {doc?.jobcommitment}
        </div>
      </div>
    </div>
  );
}

export default JobCard


