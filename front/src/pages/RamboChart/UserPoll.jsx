// src/components/UserPoll.jsx
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const UserPoll = () => {
  const [vote, setVote] = useState(null);
  const [pollData, setPollData] = useState({ fear: 10, greed: 20 });

  const handleVote = (option) => {
    setVote(option);
    setPollData((prevData) => ({
      ...prevData,
      [option]: prevData[option] + 1,
    }));
  };

  const data = {
    labels: ['Fear', 'Greed'],
    datasets: [
      {
        label: 'Votes',
        data: [pollData.fear, pollData.greed],
        backgroundColor: ['#ef4444', '#10b981'],
      },
    ],
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mt-8">
      <h2 className="text-xl font-bold">What’s your market sentiment?</h2>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => handleVote('fear')}
          className={`px-4 py-2 ${vote === 'fear' ? 'bg-red-500' : 'bg-gray-200'}`}
        >
          Fear
        </button>
        <button
          onClick={() => handleVote('greed')}
          className={`px-4 py-2 ${vote === 'greed' ? 'bg-green-500' : 'bg-gray-200'}`}
        >
          Greed
        </button>
      </div>
      {vote && (
        <div className="mt-4">
          <Bar data={data} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

export default UserPoll;
