import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const TotalEmployees = ({ members }) => {
  const total = members && members.length ? members.length : 423;
  const men = Math.round(total * 0.6);
  const women = total - men;
  const data = [
    { name: 'Man', value: men, color: '#93c5fd' },
    { name: 'Women', value: women, color: '#f472b6' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Total Employees</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{total}</p>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={24}
              formatter={(value) => value}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

TotalEmployees.propTypes = {
  members: PropTypes.array,
};

export default TotalEmployees;

