import PropTypes from 'prop-types';

/**
 * EmployeesAvailability component - displays 4 cards with attendance metrics
 */
const EmployeesAvailability = ({ members }) => {
  // Calculate metrics from members data
  const attendance = members.length > 0 ? members.filter(m => m.status === 'Working').length * 50 : 400;
  const lateComing = 17;
  const absent = members.length > 0 ? members.filter(m => m.status === 'Offline').length : 6;
  const leaveApply = 14;

  const cards = [
    {
      title: 'Attendance',
      value: attendance,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" fill="none" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
        </svg>
      ),
      bgColor: 'bg-white',
      iconColor: 'text-gray-900',
    },
    {
      title: 'Late Coming',
      value: lateComing,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6l4 2" />
        </svg>
      ),
      bgColor: 'bg-white',
      iconColor: 'text-gray-900',
    },
    {
      title: 'Absent',
      value: absent,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      bgColor: 'bg-white',
      iconColor: 'text-gray-900',
    },
    {
      title: 'Leave Apply',
      value: leaveApply,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L4 10h16L12 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-3 0-6 2-6 5v2h12V8c0-3-3-5-6-5z" />
          <line x1="12" y1="20" x2="12" y2="10" strokeLinecap="round" strokeWidth={2} />
          <rect x="10" y="18" width="4" height="2" fill="currentColor" />
        </svg>
      ),
      bgColor: 'bg-white',
      iconColor: 'text-gray-900',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
        Employees Availability
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} dark:bg-gray-700 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-600 flex items-center space-x-4`}
          >
            {/* Icon */}
            <div className={`${card.iconColor} dark:text-white flex-shrink-0`}>
              {card.icon}
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {card.value.toString().padStart(3, '0')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

EmployeesAvailability.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EmployeesAvailability;
