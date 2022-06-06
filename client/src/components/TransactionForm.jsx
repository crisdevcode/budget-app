import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";

const TransactionForm = () => {
    const { addTransaction, transactions, updateTransaction } =
        useContext(GlobalContext);
    const navigate = useNavigate();
    const params = useParams();

    const [transaction, setTransaction] = useState({
        title: "",
        amount: "",
        date: "",
        type: "",
    });

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        transaction.amount =
            transaction.type === "expense"
                ? transaction.amount * -1
                : +transaction.amount;
        if (transaction.id) {
            updateTransaction(transaction);
        } else {
            addTransaction(transaction);
        }
        navigate("/");
    };

    useEffect(
        () => {
            const transactionFound = transactions.find(
                (transaction) => transaction.id === params.id
            );

            if (transactionFound) {
                setTransaction(transactionFound);
            }
        },
        [params.id],
        transaction
    );

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="bg-white p-3">
                <h2 className="mb-7 font-bold text-3x1">
                    {transaction.id
                        ? "Edit Transaction"
                        : "Create a Transaction"}
                </h2>

                <div className="mb-2">
                    <label className="text-sm text-gray-700" htmlFor="title">
                        Title
                    </label>
                    <input
                        onChange={handleChange}
                        value={transaction.title}
                        type="text"
                        name="title"
                        placeholder="Write a title"
                        className="py-3 px-4 focus:outline-none focus:text-gray-600 bg-gray-50 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="text-sm text-gray-700" htmlFor="amount">
                        Amount
                    </label>
                    <input
                        name="amount"
                        onChange={handleChange}
                        value={transaction.amount}
                        type="number"
                        placeholder="Enter amount"
                        className="py-3 px-4 focus:outline-none focus:text-gray-600 bg-gray-50 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="text-sm text-gray-700" htmlFor="date">
                        Date
                    </label>
                    <input
                        name="date"
                        onChange={handleChange}
                        value={transaction.date}
                        type="date"
                        className="text-neutral-400 py-3 px-4 focus:text-gray-600 bg-gray-50  focus:outline-none w-full"
                    />
                </div>
                {params.hasOwnProperty("id") || (
                    <>
                        <div className="wrapper">
                            <input
                                onChange={handleChange}
                                type="radio"
                                name="type"
                                id="option-1"
                                value="income"
                            />
                            <input
                                onChange={handleChange}
                                type="radio"
                                name="type"
                                id="option-2"
                                value="expense"
                            />
                            <label
                                htmlFor="option-1"
                                className="option option-1"
                            >
                                <div className="dot"></div>
                                <span>Income</span>
                            </label>
                            <label
                                htmlFor="option-2"
                                className="option option-2"
                            >
                                <div className="dot"></div>
                                <span>Expensive</span>
                            </label>
                        </div>
                    </>
                )}

                <button className="text-gray-50 bg-green-600  w-full hover:bg-green-500 py-2 px-4 mt-5">
                    {transaction.id ? "Save changes" : "Create a transaction"}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
