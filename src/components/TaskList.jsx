import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateTaskProgress, deleteTask } from '../redux/slices/membersSlice';
import { formatDate, isDueSoon, isOverdue } from '../utils/date';

/**
 * TaskList component - displays tasks for current user with progress controls
 */
const TaskList = ({ tasks, memberId }) => {
  const dispatch = useDispatch();

  const handleProgressChange = (taskId, delta) => {
    dispatch(updateTaskProgress({ memberId, taskId, delta }));
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask({ memberId, taskId }));
    }
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Tasks
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No tasks assigned yet.
        </p>
      </div>
    );
  }

  const renderTask = (task) => {
    const dueSoon = isDueSoon(task.dueDate);
    const overdue = isOverdue(task.dueDate);

    return (
      <div
        key={task.id}
        className={`p-4 rounded-lg border ${
          task.completed
            ? 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-75'
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h4
              className={`font-medium ${
                task.completed
                  ? 'text-gray-500 dark:text-gray-400 line-through'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {task.title}
            </h4>
            <p
              className={`text-sm mt-1 ${
                overdue
                  ? 'text-red-600 dark:text-red-400'
                  : dueSoon
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Due: {formatDate(task.dueDate)}
              {overdue && ' (Overdue)'}
              {dueSoon && !overdue && ' (Due Soon)'}
            </p>
          </div>
          {!task.completed && (
            <button
              onClick={() => handleDelete(task.id)}
              className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 focus:outline-none"
              aria-label="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Progress: {task.progress}%
            </span>
            {task.completed && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                ✓ Completed
              </span>
            )}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                task.completed
                  ? 'bg-green-600'
                  : task.progress >= 75
                  ? 'bg-blue-600'
                  : task.progress >= 50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${task.progress}%` }}
              role="progressbar"
              aria-valuenow={task.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Progress Controls */}
        {!task.completed && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleProgressChange(task.id, -10)}
              disabled={task.progress <= 0}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Decrease progress by 10%"
            >
              -10%
            </button>
            <button
              onClick={() => handleProgressChange(task.id, 10)}
              disabled={task.progress >= 100}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Increase progress by 10%"
            >
              +10%
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Your Tasks
      </h3>

      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Active ({activeTasks.length})
          </h4>
          <div className="space-y-3">{activeTasks.map(renderTask)}</div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Completed ({completedTasks.length})
          </h4>
          <div className="space-y-3">{completedTasks.map(renderTask)}</div>
        </div>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  memberId: PropTypes.string.isRequired,
};

export default TaskList;

