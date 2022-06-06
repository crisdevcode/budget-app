import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Balance = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    return (
        <div className="flex flex-col items-center">
            <div className="text-xs font-semibold">Total Balance</div>
            <span
                className={` text-3xl ${
                    total < 0 ? "text-red-500" : "text-green-400"
                }`}
            >
                ${total < 0 ? 0 : total}
            </span>
        </div>
    );
};

export default Balance;
