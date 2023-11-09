import React, { useEffect, useState } from "react";
import '../App.css';

const TransactionDetails = ({ alchemy, transactionHash }) => {
    const [TransactionDetails, setTransactionDetails] = useState(null);

    useEffect(() => {
        const getTransactionDetails = async () => {
            if(transactionHash) {
                const details = await alchemy.core.getTransactionReceipt(transactionHash);
                setTransactionDetails(details);
            }
        };
        getTransactionDetails();
    }, [alchemy, transactionHash]);

    return (
        <div>
            <h2>Transaction Details</h2>
            {TransactionDetails && (
                <pre>{JSON.stringify(TransactionDetails, null, 2)}</pre>
            )}
        </div>
    );
};
export default TransactionDetails;