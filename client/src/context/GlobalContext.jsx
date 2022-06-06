import { createContext, useReducer } from "react";
import appReducer from "./AppReducer";
import { v4 } from "uuid";
import axios from "axios";

const initialState = {
    transactions: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Actions

    const getTransactions = async () => {
        try {
            const res = await axios.get(
                "http://localhost:4000/api/v1/transactions"
            );

            dispatch({
                type: "GET_TRANSACTIONS",
                payload: res.data.data,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const addTransaction = async (transaction) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            transaction.id = v4();
            axios.post(
                "http://localhost:4000/api/v1/transactions",
                transaction,
                config
            );

            dispatch({
                type: "ADD_TRANSACTION",
                payload: { ...transaction },
            });
        } catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err,
            });
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(
                `http://localhost:4000/api/v1/transactions/${id}`
            );
            dispatch({ type: "DELETE_TRANSACTION", payload: id });
        } catch (err) {
            console.log(err);
        }
    };

    const updateTransaction = async (transaction) => {
        try {
            await axios.put(
                `http://localhost:4000/api/v1/transactions/${transaction.id}`,
                transaction
            );
            dispatch({ type: "UPDATE_TRANSACTION", payload: transaction });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                addTransaction,
                deleteTransaction,
                updateTransaction,
                getTransactions,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
