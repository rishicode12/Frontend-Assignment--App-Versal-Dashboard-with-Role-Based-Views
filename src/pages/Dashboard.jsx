import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import MemberCard from '../components/MemberCard';
import StatusSelector from '../components/StatusSelector';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import EmployeesInfoChart from '../components/EmployeesInfoChart';
import EmployeesAvailability from '../components/EmployeesAvailability';
import StatusChart from '../components/StatusChart';
import RightSidebar from '../components/RightSidebar';
import TotalEmployees from '../components/TotalEmployees';
 

/**
 * Dashboard component - role-aware layout rendering lead or member views
 */
const Dashboard = () => {
  const { currentRole, currentUser } = useSelector((state) => state.role);
  const { members, filters, sortBy } = useSelector((state) => state.members);

  // Filter and sort members for lead view
  const filteredAndSortedMembers = useMemo(() => {
    let result = [...members];

    // Apply status filter
    if (filters.status) {
      result = result.filter((member) => member.status === filters.status);
    }

    // Apply sorting by active tasks count (descending)
    if (sortBy === 'activeTasksDesc') {
      result.sort((a, b) => {
        const aActive = a.tasks.filter((t) => !t.completed).length;
        const bActive = b.tasks.filter((t) => !t.completed).length;
        return bActive - aActive;
      });
    }

    return result;
  }, [members, filters.status, sortBy]);

  // Get current user's tasks for member view
  const currentUserTasks = useMemo(() => {
    if (!currentUser) return [];
    const member = members.find((m) => m.id === currentUser);
    return member?.tasks || [];
  }, [members, currentUser]);

  

  // Team Lead View
  if (currentRole === 'lead') {
    return (
      <div className="px-6 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Team Lead Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor team status and assign tasks
          </p>
        </div>
        <div className="lg:flex lg:space-x-6">
          <div className="flex-1">
            <div className="mb-4">
              <EmployeesInfoChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <EmployeesAvailability members={members} />
              <TotalEmployees members={members} />
            </div>
            <div className="mb-6">
              <StatusChart members={members} />
            </div>
            <div className="mb-6">
              <TaskForm />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Team Members ({filteredAndSortedMembers.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAndSortedMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
              {filteredAndSortedMembers.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No members match the current filters.
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 lg:mt-0 w-full lg:w-96 shrink-0">
            <RightSidebar />
          </div>
        </div>
      </div>
    );
  }

  // Team Member View
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Team Member Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Update your status and manage your tasks
        </p>
      </div>

      {/* Status Selector */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          1. Update Your Status
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Choose the option that best represents what you’re doing right now. This keeps the whole team in sync.
        </p>
        <StatusSelector currentUserId={currentUser} />
      </div>

      {/* Task List */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          2. View Your Tasks
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Review what’s assigned to you, update progress in 10% steps, and mark tasks complete at 100%.
        </p>
        <TaskList tasks={currentUserTasks} memberId={currentUser} />
      </div>
    </div>
  );
};

export default Dashboard;
