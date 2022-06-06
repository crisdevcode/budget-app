export default function appReducer(state, action) {
    switch (action.type) {
        case "GET_TRANSACTIONS":
            return {
                transactions: action.payload,
            };
        case "ADD_TRANSACTION":
            return {
                transactions: [...state.transactions, action.payload],
            };
        case "DELETE_TRANSACTION":
            return {
                transactions: state.transactions.filter(
                    (transaction) => transaction.id !== action.payload
                ),
            };
        case "UPDATE_TRANSACTION":
            const updatedTransaction = action.payload;

            const updatedTransactions = state.transactions.map(
                (transaction) => {
                    if (transaction.id === updatedTransaction.id) {
                        (transaction.title = updatedTransaction.title),
                            (transaction.amount = updatedTransaction.amount);
                        transaction.date = updatedTransaction.date;
                        transaction.type = updatedTransaction.type;
                    }
                    return transaction;
                }
            );
            return {
                transactions: updatedTransactions,
            };
        default:
            break;
    }

    return {
        transactions: [...state.transactions, action.payload],
    };
}
