import PropTypes from 'prop-types';

/**
 * SummaryChips component - displays aggregate status counts
 */
const SummaryChips = ({ members }) => {
  const statusCounts = members.reduce(
    (acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1;
      return acc;
    },
    { Working: 0, Break: 0, Meeting: 0, Offline: 0 }
  );

  const total = members.length;

  const statusConfig = [
    { label: 'Working', count: statusCounts.Working, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    { label: 'Meeting', count: statusCounts.Meeting, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    { label: 'Break', count: statusCounts.Break, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { label: 'Offline', count: statusCounts.Offline, color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Team Status Summary
      </h3>
      <div className="flex flex-wrap gap-3">
        {statusConfig.map((status) => (
          <span
            key={status.label}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
          >
            {status.count} {status.label}
          </span>
        ))}
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
          Total: {total}
        </span>
      </div>
    </div>
  );
};

SummaryChips.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['Working', 'Break', 'Meeting', 'Offline']).isRequired,
    })
  ).isRequired,
};

export default SummaryChips;

