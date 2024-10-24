// src/App.jsx
import { useState } from 'react';
import RamboChart from "./RamboChart";
import CryptoComparison from "./CryptoComparison";
import DataInsights from "./DataInsights";
import UserPoll from "./UserPoll";
import HistoricalTable from "./HistoricalTable";

const CompleteRambo = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Crypto Rambo Chart</h1>

      <div className="mb-6 text-center">
        <label htmlFor="crypto-select" className="mr-2 text-lg font-medium">Select Cryptocurrency:</label>
        <select
          id="crypto-select"
          value={selectedCrypto}
          onChange={handleCryptoChange}
          className="border border-gray-300 rounded p-2"
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="litecoin">Litecoin</option>
          <option value="ripple">Ripple</option>
          {/* Add more cryptocurrencies as needed */}
        </select>
      </div>

      <RamboChart crypto={selectedCrypto} />
      <CryptoComparison />
      <DataInsights />
      <UserPoll />
      <HistoricalTable crypto={selectedCrypto} />
    </div>
  );
};

export default CompleteRambo;
