import moment from 'moment';

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Group expenses by date
  const groupedByDate = {};
  
  sortedData.forEach((item) => {
    const dateKey = moment(item?.date).format('Do MMM');
    
    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = {
        month: dateKey,
        amount: 0,
        expenses: [],
        categories: []
      };
    }
    
    groupedByDate[dateKey].amount += item?.amount || 0;
    groupedByDate[dateKey].expenses.push({
      category: item?.category,
      amount: item?.amount,
      id: item?._id,
      icon: item?.icon
    });
    
    // Keep track of unique categories for this date
    if (item?.category && !groupedByDate[dateKey].categories.includes(item.category)) {
      groupedByDate[dateKey].categories.push(item.category);
    }
  });
  
  // Convert grouped data to array format
  const chartData = Object.values(groupedByDate).map(dateGroup => ({
    month: dateGroup.month,
    amount: dateGroup.amount,
    // If only one expense, show category directly; if multiple, show summary
    category: dateGroup.expenses.length === 1 
      ? dateGroup.expenses[0].category 
      : `${dateGroup.expenses.length} expenses (${dateGroup.categories.join(', ')})`,
    // Include all expenses for detailed tooltip
    expenses: dateGroup.expenses,
    // Include categories summary
    categoriesSummary: dateGroup.categories.join(', ')
  }));
  
  return chartData;
};

