import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * EmployeesInfoChart component - line chart showing employee data over time
 */
const EmployeesInfoChart = () => {
  // Sample data matching the chart design
  const data = [
    { date: '0 Jan', value: 320 },
    { date: '31 Jan', value: 450 },
    { date: '22 Feb', value: 380 },
    { date: '15 Mar', value: 420 },
    { date: '05 Apr', value: 520 },
    { date: '26 Apr', value: 280 },
    { date: '17 May', value: 400 },
    { date: '08 Jun', value: 480 },
    { date: '29 Jun', value: 250 },
    { date: '20 Jul', value: 350 },
  ];

  // Custom dot component for yellow circles
  const CustomDot = (props) => {
    const { cx, cy } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#FFD700"
        stroke="#fff"
        strokeWidth={2}
      />
    );
  };

  CustomDot.propTypes = {
    cx: PropTypes.number,
    cy: PropTypes.number,
  };

  // Gradient removed for consistent solid orange stroke

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
        Employees Info
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
        >
          {/* Solid orange curve line */}
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={false}
            domain={[0, 'dataMax + 100']}
            width={0}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '8px 12px',
            }}
            labelStyle={{ color: '#374151', fontWeight: 'bold', marginBottom: '4px' }}
            itemStyle={{ color: '#6b7280', fontSize: '14px' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#F59E0B"
            strokeOpacity={1}
            strokeWidth={4}
            dot={<CustomDot />}
            activeDot={{ r: 6, fill: '#FFD700', stroke: '#fff', strokeWidth: 2 }}
            connectNulls={true}
            isAnimationActive={true}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeesInfoChart;
