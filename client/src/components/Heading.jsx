import React from "react";
import Balance from "./Balance";
import IncomeExpense from "./IncomeExpense";

const Heading = () => {
    return (
        <div className="text-white">
            <div>
                <Balance />
                <IncomeExpense />
            </div>
        </div>
    );
};

export default Heading;
