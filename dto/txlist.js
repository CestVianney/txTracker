class TxList {
    status;
    message;
    result = [];

    constructor(data) {
        this.status = data.status;
        this.message = data.message;
        this.result = data.result.map((tx) => {
            const txListResult = new TxListResult();
            txListResult.blockNumber = tx.blockNumber;
            txListResult.timeStamp = tx.timeStamp;
            txListResult.hash = tx.hash;
            txListResult.from = tx.from;
            txListResult.to = tx.to;
            txListResult.value = tx.value;
            txListResult.contractAddress = tx.contractAddress;
            txListResult.input = tx.input;
            txListResult.type = tx.type;
            txListResult.gas = tx.gas;
            txListResult.gasUsed = tx.gasUsed;
            txListResult.traceId = tx.traceId;
            txListResult.isError = tx.isError;
            txListResult.errCode = tx.errCode;
            return txListResult;
        });
    }
}

class TxListResult {
    blockNumber;
    timeStamp;
    hash;
    from;
    to;
    value;
    contractAddress;
    input;
    type;
    gas;
    gasUsed;
    traceId;
    isError;
    errCode;
}

export { TxList, TxListResult };