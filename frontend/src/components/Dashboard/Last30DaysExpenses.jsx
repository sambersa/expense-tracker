import React, {useEffect, useState} from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({data}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        console.log('Raw data:', data);
        const result = prepareExpenseBarChartData(data);
        console.log('Prepared chart data:', result);
        setChartData(result);

        return () => {};
    },  [data]);

  return (
    <div className="card colspan-1">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Expenses for the past 30 days</h5>
        </div>

        {chartData && chartData.length > 0 ? (
            <CustomBarChart 
                data={chartData} 
                xAxisKey="category"
                key={`expense-chart-${chartData.length}`}
            />
        ) : (
            <div className="mt-6 flex items-center justify-center h-[300px] text-gray-500">
                No expense data available
            </div>
        )}
    </div>
  )
}

export default Last30DaysExpenses