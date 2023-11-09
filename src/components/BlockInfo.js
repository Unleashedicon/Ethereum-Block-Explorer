import React, {useEffect, useState} from "react";
import '../App.css';
const BlockInfo =({ alchemy, onBlockClick }) => {
    const [blockNumber, setBlockNumber] = useState();
    const [blockInfo, setBlockInfo] = useState(null);

    useEffect(() => {
        const getBlockNumber = async () => {
            const currentBlockNumber = await alchemy.core.getBlockNumber();
            setBlockNumber(currentBlockNumber);
        };
        getBlockNumber();
    }, [alchemy]);

    useEffect(() => {
        const getBlockInfo = async () => {
            if(blockNumber) {
                const info = await alchemy.core.getBlock(blockNumber);
                setBlockInfo(info);
            }
        };
        getBlockInfo();
    }, [alchemy, blockNumber]);

    return (
        <div onClick={() => onBlockClick(blockNumber)}>
            <h2>Block Number: {blockNumber}</h2>
            {blockInfo && (
                <div>
                    <h2>Block Information</h2>
                    <pre>{JSON.stringify(blockInfo, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default BlockInfo;