import React, { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const TransactionItem = ({ transaction }) => {
    const { deleteTransaction } = useContext(GlobalContext);
    return (
        <div className="border-b mb-1 border-green-600 p-2 w-full text-black shadow-2x1 flex items-center justify-between">
            <div>
                <h1 className="text-base w-20">{transaction.title}</h1>
                <p className="text-xs text-gray-500">
                    {transaction.created_at}
                </p>
            </div>
            <p className="font-medium">{`$ ${Math.abs(transaction.amount)}`}</p>

            {transaction.type === "expense" ? (
                <div
                    className={`bg-red-400 text-white font-semibold p-1 text-xs rounded-3xl`}
                >
                    <BsArrowDownCircle />
                </div>
            ) : (
                <div
                    className={`bg-green-400 text-white font-semibold p-1 text-xs rounded-3xl`}
                >
                    <BsArrowUpCircle />
                </div>
            )}

            <div>
                <Link
                    to={`/edit/${transaction.id}`}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-2 py-1 text-xs mr-1 rounded-lg inline-flex items-center"
                >
                    <FiEdit />
                </Link>
                <button
                    onClick={() => deleteTransaction(transaction.id)}
                    type="button"
                    className="px-2 py-1 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                    <RiDeleteBin6Line />
                </button>
            </div>
        </div>
    );
};

export default TransactionItem;
