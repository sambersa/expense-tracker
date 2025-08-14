import React, { useState, useEffect } from 'react'
import { LuPlus } from "react-icons/lu"
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        console.log('Income transactions:', transactions);
        const result = prepareIncomeBarChartData(transactions);
        console.log('Income chart data:', result);
        setChartData(result)

        return () => {};
    }, [transactions])
    
    return (
         <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Monitor your earnings and uncover income trends over time.
                    </p>
                </div>

                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg" />
                    Add Income
                </button>
            </div>

            <div className="mt-10">
                {chartData && chartData.length > 0 ? (
                    <CustomBarChart 
                        data={chartData} 
                        xAxisKey="month"
                        key={`income-chart-${chartData.length}`}
                    />
                ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500">
                        No income data available
                    </div>
                )}
            </div>
        </div>
    );
};

export default IncomeOverview