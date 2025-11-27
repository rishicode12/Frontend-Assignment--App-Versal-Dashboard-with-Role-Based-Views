import PropTypes from 'prop-types';

const StatCard = ({ bg, iconLeft, value, label, iconRight }) => {
  return (
    <div className={`rounded-lg shadow-sm border border-gray-100 ${bg} p-4 flex items-center justify-between`}> 
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center text-gray-900">
          {iconLeft}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
      <div className="text-gray-500">{iconRight}</div>
    </div>
  );
};

StatCard.propTypes = {
  bg: PropTypes.string.isRequired,
  iconLeft: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  iconRight: PropTypes.node,
};

const UpcomingItem = ({ name, role, time, color }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white`}> 
          <span className="text-sm">👤</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-600">{role}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-gray-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs">{time}</span>
      </div>
    </div>
  );
};

UpcomingItem.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

const RightSidebar = () => {
  return (
    <aside className="w-full lg:w-96 space-y-4">
      <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="bg-indigo-700 p-4 text-white">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6M9 16h6M7 8h10M5 6h14v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6z" />
              </svg>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-4xl font-bold">1546</p>
            <p className="text-sm opacity-90">Applications</p>
          </div>
        </div>
      </div>

      <StatCard
        bg="bg-green-50"
        value={246}
        label="Interviews"
        iconLeft={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
        iconRight={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13l3-3 4 4 5-6"/></svg>}
      />

      <StatCard
        bg="bg-green-50"
        value={101}
        label="Hired"
        iconLeft={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>}
        iconRight={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17l4-4 4 2 5-8"/></svg>}
      />

      <div className="rounded-lg shadow-sm border border-gray-200 bg-white">
        <div className="px-4 py-3">
          <p className="text-sm font-semibold text-gray-900">Upcoming Interviews</p>
        </div>
        <div className="px-4">
          <UpcomingItem name="Natalie Gibson" role="Ui/UX Designer" time="1.30 - 1:30" color="bg-yellow-500" />
          <UpcomingItem name="Peter Piperg" role="Web Design" time="9.00 - 1:30" color="bg-red-500" />
        </div>
        <div className="h-3" />
      </div>
    </aside>
  );
};

export default RightSidebar;

