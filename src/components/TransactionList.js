import React, {useEffect, useState} from "react";
import '../App.css';

const TransactionList = ({ alchemy, blockNumber, onTransactionClick }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getTransactions = async () => {
            if(blockNumber) {
                const blockWithTransactions = await alchemy.core.getBlockWithTransactions(blockNumber);
                setTransactions(blockWithTransactions.transactions);
            }
        };

        getTransactions();
    }, [alchemy, blockNumber]);

    return (
        <div>
            <h2> Transactions in Block</h2>
            <ul>
                {transactions.map((tx) => (
                    <li key={tx.hash} onClick={() => onTransactionClick(tx.hash)}>
                        Transaction Hash: {tx.hash}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;