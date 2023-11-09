import React, { useState } from 'react';
import '../App.css';

const AccountBalance = ({ alchemy }) => {
  const [accountAddress, setAccountAddress] = useState('');
  const [balance, setBalance] = useState(null);

  const handleAccountSearch = async () => {
    if (accountAddress) {
      const fetchedBalance = await alchemy.core.getBalance(accountAddress);
      setBalance(fetchedBalance);
    }
  };

  return (
    <div className="account-container">
      <h2 className="account-heading">Account Balance</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter account address"
          value={accountAddress}
          onChange={(e) => setAccountAddress(e.target.value)}
        />
        <button className="search-button" onClick={handleAccountSearch}>
          Search Balance
        </button>
      </div>
      {balance !== null ? (
        <p className="account-balance">Balance: {balance.toString()}</p>
      ) : (
        <p>Provide Address</p>
      )}
    </div>
  );
};

export default AccountBalance;
