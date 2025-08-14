import React from 'react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

const CustomLineChart = ({ data }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        // Only render when tooltip is actually active and has data
        if (!active || !payload || !payload.length) {
            return null;
        }

        const data = payload[0].payload;
        
        return (
            <div className="bg-white shadow-md rounded-lg p-3 border border-gray-300">
                <p className="font-medium text-gray-800 mb-2">{label}</p>
                
                {/* Show category as the main expense name */}
                {data.category && (
                    <p className="text-sm font-medium text-purple-600 mb-1">
                        {data.category}
                    </p>
                )}
                
                <p className="text-sm">
                    Amount: <span className="font-medium text-gray-900">${data.amount}</span>
                </p>
                
                {/* Show multiple expenses if they exist for this date */}
                {data.expenses && data.expenses.length > 1 && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs font-medium text-gray-600 mb-1">All expenses on this date:</p>
                        {data.expenses.map((expense, index) => (
                            <p key={index} className="text-xs text-gray-600">
                                • {expense.category}: ${expense.amount}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return <div className="bg-white">
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="incomeGradient" x1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <CartesianGrid stroke="none" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                <Tooltip content={<CustomTooltip />} />

                <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#875cf5" 
                    fill="url(#incomeGradient)" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: "#875cf5" }} 
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>;
}

export default CustomLineChart