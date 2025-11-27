import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../redux/slices/membersSlice';

/**
 * TaskForm component - form for team leads to assign tasks to members
 */
const TaskForm = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);

  const [formData, setFormData] = useState({
    memberId: members.length > 0 ? members[0].id : '',
    title: '',
    dueDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.memberId || !formData.title || !formData.dueDate) {
      alert('Please fill in all fields');
      return;
    }

    dispatch(addTask({
      memberId: formData.memberId,
      title: formData.title,
      dueDate: formData.dueDate,
    }));

    // Reset form
    setFormData({
      memberId: members.length > 0 ? members[0].id : '',
      title: '',
      dueDate: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Assign New Task
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Member Selection */}
        <div>
          <label
            htmlFor="memberId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Team Member
          </label>
          <select
            id="memberId"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Task Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter task title..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Due Date
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

