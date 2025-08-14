import React, { useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);

    return <div className="card">
        <div className="flex items-center justify-between">
            <div className="">
            <h5 className="text-lg">Expense Overview</h5>
            <p className="">
                Track your spending here to see what all your money
                goes to
            </p>
        </div>

        <button className="add-btn" onClick={onExpenseIncome}>
            <LuPlus className="text-lg" />
            Add Expense
        </button>
    </div>

    <div className="mt-10">
        <CustomLineChart data={chartData} />
    </div>
  </div>
}

export default ExpenseOverview
