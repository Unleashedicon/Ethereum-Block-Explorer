import React, { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import BlockInfo from './components/BlockInfo';
import TransactionDetails from './components/TransactionDetails';
import TransactionList from './components/TransactionList';
import AccountBalance from './components/AccountBalance';

import './App.css';
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);


function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactionHash, setTransactionHash] = useState(null);
  const [accountAddress, setAccountAddress] = useState(null);

  const handleBlockClick = (blockNumber) => {
    setBlockNumber(blockNumber);
    setTransactionHash(null);
  };

  const handleTransactionClick = (hash) => {
    setTransactionHash(hash);
  };

  const handleAccountSearch = async (address) => {
    setAccountAddress(address);
    setBlockNumber(null);
    setTransactionHash(null);
  };

  return (
    <div className="App">
      <BlockInfo alchemy={alchemy} onBlockClick={handleBlockClick} />
      {blockNumber && (
        <>
          <TransactionList
            alchemy={alchemy}
            blockNumber={blockNumber}
            onTransactionClick={handleTransactionClick}
          />
          {transactionHash && (
            <TransactionDetails alchemy={alchemy} transactionHash={transactionHash} />
          )}
        </>
      )}
      <hr />
      <AccountBalance alchemy={alchemy} />
    </div>
  );
}

export default App;
