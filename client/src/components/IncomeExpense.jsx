import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const IncomeExpense = () => {
    const { transactions } = useContext(GlobalContext);
    const amounts = transactions.map((transaction) => transaction.amount);

    let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => (acc += item), 0);

    const expense =
        amounts
            .filter((item) => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;

    return (
        <div className="flex justify-between">
            <div>
                <p className="text-sm ">Income</p>
                <p className="text-md text-green-400">
                    {formatter.format(income)}
                </p>
            </div>
            <div>
                <p className="text-sm">Expenses</p>
                <p className="text-md text-red-400">
                    {formatter.format(expense)}
                </p>
            </div>
        </div>
    );
};

export default IncomeExpense;
