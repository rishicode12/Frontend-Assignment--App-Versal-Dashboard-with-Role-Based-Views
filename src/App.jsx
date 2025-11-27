import { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store';
import { setMembers, restoreState, resetInactiveUsers } from './redux/slices/membersSlice';
import { switchRole, setUser } from './redux/slices/roleSlice';
import { seedMembers } from './utils/seedData';
import { loadState, saveState, debounce } from './utils/storage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

/**
 * AppContent - Main app logic with data seeding and persistence
 */
const AppContent = () => {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const members = useSelector((state) => state.members.members);
  const lastInteractionAtByUser = useSelector((state) => state.members.lastInteractionAtByUser);
  const role = useSelector((state) => state.role);

  // Load initial state from localStorage
  useEffect(() => {
    // Load dark mode preference
    const savedDarkMode = loadState('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode);
      if (savedDarkMode) {
        document.documentElement.classList.add('dark');
      }
    }

    // Load RTL preference
    const savedRTL = loadState('rtl');
    if (savedRTL !== null) {
      setIsRTL(savedRTL);
      document.documentElement.dir = savedRTL ? 'rtl' : 'ltr';
      document.documentElement.classList.toggle('rtl', savedRTL);
    } else {
      document.documentElement.dir = 'ltr';
    }

    // Load role state
    const savedRole = loadState('role');
    if (savedRole) {
      dispatch(switchRole(savedRole.currentRole));
      if (savedRole.currentUser) {
        dispatch(setUser(savedRole.currentUser));
      }
    }

    // Load members state
    const savedMembers = loadState('members');
    if (savedMembers && savedMembers.members && savedMembers.members.length > 0) {
      dispatch(restoreState(savedMembers));
      setLoading(false);
    } else {
      // Seed initial data
      seedMembers()
        .then((membersData) => {
          dispatch(setMembers(membersData));
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error seeding data:', err);
          setError('Failed to load team members. Please refresh the page.');
          setLoading(false);
        });
    }
  }, [dispatch]);

  // Persist state to localStorage (debounced)
  useEffect(() => {
    const debouncedSave = debounce(() => {
      saveState('members', {
        members,
        lastInteractionAtByUser,
      });
    }, 500);

    if (members.length > 0) {
      debouncedSave();
    }
  }, [members, lastInteractionAtByUser]);

  // Persist role state
  useEffect(() => {
    saveState('role', role);
  }, [role]);

  // Auto-reset inactive users (10 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const inactiveThreshold = now - 10 * 60 * 1000; // 10 minutes ago
      dispatch(resetInactiveUsers({ inactiveThreshold }));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  // Dark mode toggle
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    saveState('darkMode', newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // RTL toggle
  const toggleRTL = () => {
    const nextRTL = !isRTL;
    setIsRTL(nextRTL);
    saveState('rtl', nextRTL);
    document.documentElement.dir = nextRTL ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('rtl', nextRTL);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading team data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        rtlEnabled={isRTL}
        onToggleRTL={toggleRTL}
      />
      <div className={isRTL ? 'mr-64' : 'ml-64'}>
        <Header isRTL={isRTL} />
        <main className="pt-16 min-h-screen">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

/**
 * Main App component with Redux Provider
 */
const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;

