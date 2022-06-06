import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
    }, [transactions.length]);

    return (
        <div className="bg-gray-50 w-50 flex flex-col justify-between items-center p-5 ">
            <h1 className="text-sm text-gray-600 tracking-wide">
                Transactions History
            </h1>
            <div className="w-full h-80 shadow-lg overflow-scroll p-2">
                {transactions.map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))}
            </div>
            <div className="flex-grow text-right px-4 py-2 m-2">
                <Link to="/add">
                    <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                        <IoMdAdd />
                        Add Transaction
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TransactionList;
