import React from 'react'

const Last30DaysExpenses = ({data}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return () => {};
    },  [data]);

  return (
    <div className="card colspan-1">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Expenses for the past 30 days</h5>

        </div>
    </div>
  )
}

export default Last30DaysExpenses