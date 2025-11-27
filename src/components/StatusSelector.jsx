import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../redux/slices/membersSlice';

/**
 * StatusSelector component - mutually exclusive status buttons for member view
 */
const StatusSelector = ({ currentUserId }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);

  const statuses = [
    { value: 'Working', label: 'Working', icon: '💼' },
    { value: 'Break', label: 'Break', icon: '☕' },
    { value: 'Meeting', label: 'Meeting', icon: '📅' },
    { value: 'Offline', label: 'Offline', icon: '💤' },
  ];

  const handleStatusChange = (status) => {
    if (currentUserId) {
      dispatch(setStatus({ memberId: currentUserId, status }));
    }
  };

  // Get current status from Redux
  const currentMember = members.find((m) => m.id === currentUserId);
  const currentStatus = currentMember?.status || 'Offline';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Update Your Status
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            className={`px-4 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              currentStatus === status.value
                ? 'bg-blue-600 text-white shadow-md transform scale-105'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-label={`Set status to ${status.label}`}
            aria-pressed={currentStatus === status.value}
          >
            <span className="text-2xl mb-1 block">{status.icon}</span>
            <span className="text-sm">{status.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

StatusSelector.propTypes = {
  currentUserId: PropTypes.string,
};

StatusSelector.defaultProps = {
  currentUserId: null,
};

export default StatusSelector;

