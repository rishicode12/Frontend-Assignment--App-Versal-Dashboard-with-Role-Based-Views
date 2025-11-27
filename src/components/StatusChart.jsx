import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

/**
 * StatusChart component - pie chart showing status distribution
 */
const StatusChart = ({ members }) => {
  const statusCounts = members.reduce(
    (acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1;
      return acc;
    },
    { Working: 0, Break: 0, Meeting: 0, Offline: 0 }
  );

  const data = [
    { name: 'Working', value: statusCounts.Working, color: '#10b981' },
    { name: 'Meeting', value: statusCounts.Meeting, color: '#3b82f6' },
    { name: 'Break', value: statusCounts.Break, color: '#eab308' },
    { name: 'Offline', value: statusCounts.Offline, color: '#6b7280' },
  ].filter((item) => item.value > 0);

  const COLORS = {
    Working: '#10b981',
    Meeting: '#3b82f6',
    Break: '#eab308',
    Offline: '#6b7280',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Status Distribution
      </h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No data to display
        </p>
      )}
    </div>
  );
};

StatusChart.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['Working', 'Break', 'Meeting', 'Offline']).isRequired,
    })
  ).isRequired,
};

export default StatusChart;

