import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole, setUser } from '../redux/slices/roleSlice';
import { DEFAULT_AVATAR_PATH } from '../utils/seedData';

/**
 * Header component with search bar, notifications, and user profile
 */
const Header = ({ isRTL }) => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.members);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRoleToggle = () => {
    const newRole = currentRole === 'lead' ? 'member' : 'lead';
    dispatch(switchRole(newRole));
    
    // If switching to member view, set currentUser to first member if not set
    if (newRole === 'member' && !currentUser && members.length > 0) {
      dispatch(setUser(members[0].id));
    }
  };

  

  const currentMember = members.find((m) => m.id === currentUser);

  return (
    <header
      className={`bg-transparent h-16 fixed top-0 z-20 ${
        isRTL ? 'right-64 left-0' : 'left-64 right-0'
      }`}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side Icons and Profile */}
        <div className="flex items-center space-x-4">
          {/* Info Icon */}
          <button
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Information"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* User Avatars Group */}
          <div className="flex -space-x-2">
            {members.slice(0, 3).map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
              />
            ))}
          </div>

          {/* Notifications Bell */}
          <button
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
            aria-label="Notifications"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button>

          {/* User Profile Section */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src={currentMember?.avatar || members[0]?.avatar || DEFAULT_AVATAR_PATH}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {currentMember?.name || 'Dylan Hunter'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentRole === 'lead' ? 'Admin Profile' : 'Team Member'}
                </p>
              </div>
            </div>

            {/* Role Toggle (small toggle) */}
            <button
              onClick={handleRoleToggle}
              className="relative inline-flex h-5 w-9 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Toggle role"
              title={`Switch to ${currentRole === 'lead' ? 'Member' : 'Lead'} view`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  currentRole === 'lead' ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isRTL: PropTypes.bool,
};

Header.defaultProps = {
  isRTL: false,
};

export default Header;

