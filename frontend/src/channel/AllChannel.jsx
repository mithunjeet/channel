import { useState } from "react";

const mockChannels = [
  {
    id: 1,
    name: "pqr",
    subscribers: 1200,
    profileUrl: "https://tse2.mm.bing.net/th?id=OIP.ead20KV7wvgHaCrkq1iMpAHaEK&pid=Api&P=0&h=180",
    isSubscribed: false,
  },
  {
    id: 2,
    name: "xyz",
    subscribers: 8700,
    profileUrl: "https://tse2.mm.bing.net/th?id=OIP.i42VK3a9K1ldsgUOIxKsQQHaEK&pid=Api&P=0&h=180",
    isSubscribed: true,
  },
  {
    id: 3,
    name: "abc",
    subscribers: 450,
    profileUrl: "https://tse4.mm.bing.net/th?id=OIP.E_v9kAaNeCL4IrErzeumsAHaKv&pid=Api&P=0&h=180",
    isSubscribed: false,
  },
];

function AllChannel() {
  const [search, setSearch] = useState("");
  const [channels, setChannels] = useState(mockChannels);

  const handleToggleSubscribe = (id) => {
    setChannels((prev) =>
      prev.map((channel) =>
        channel.id === id
          ? { ...channel, isSubscribed: !channel.isSubscribed }
          : channel
      )
    );
  };

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
    
      <input
        type="text"
        placeholder="Search Channel..."
        className="w-full p-2 border rounded mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

     
      <div className="space-y-4">
        {filteredChannels.map((channel) => (
          <div
            key={channel.id}
            className="flex items-center justify-between p-4 border rounded shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <img
                src={channel.profileUrl}
                alt={channel.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold">{channel.name}</h2>
                <p className="text-sm text-gray-500">
                  {channel.subscribers} subscribers
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggleSubscribe(channel.id)}
              className={`px-4 py-2 rounded ${
                channel.isSubscribed
                  ? "bg-gray-400 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {channel.isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllChannel;
