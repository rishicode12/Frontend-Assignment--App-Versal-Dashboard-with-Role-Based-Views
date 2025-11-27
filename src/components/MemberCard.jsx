import PropTypes from 'prop-types';

/**
 * MemberCard component displays member info with status badge and active tasks count
 */
const MemberCard = ({ member, onClick }) => {
  const activeTasksCount = member.tasks.filter((t) => !t.completed).length;
  
  const statusColors = {
    Working: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Break: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Meeting: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Offline: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={member.avatar}
            alt={member.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>

        {/* Member Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {member.name}
            </p>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusColors[member.status] || statusColors.Offline
              }`}
            >
              {member.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {member.email}
          </p>
          <div className="mt-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Active Tasks: <span className="font-semibold">{activeTasksCount}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

MemberCard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['Working', 'Break', 'Meeting', 'Offline']).isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

MemberCard.defaultProps = {
  onClick: () => {},
};

export default MemberCard;

