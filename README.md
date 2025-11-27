# Team Pulse Dashboard

A comprehensive single-page React application for team management with role-based views, real-time status tracking, and task management capabilities.

## Overview

Team Pulse Dashboard is a production-ready React application built with Redux Toolkit that enables:

- **Team Leads** to monitor live member status, assign tasks, and filter/sort team members
- **Team Members** to update their working status and manage task progress
- **Global state management** via Redux Toolkit with persistence
- **Real-time updates** with auto-reset for inactive users
- **Beautiful UI** with Tailwind CSS and dark mode support

## Tech Stack

- **React 18** with Hooks
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Vite** for build tooling
- **PropTypes** for type checking

## Features

### Core Features

✅ **Role Switching**: Toggle between Team Lead and Team Member views  
✅ **Status Updates**: Members can update their live working status (Working, Break, Meeting, Offline)  
✅ **Task Management**: Leads assign tasks, members update progress with 10% increments  
✅ **Filtering & Sorting**: Filter members by status, sort by active tasks count  
✅ **Auto-completion**: Tasks automatically mark as completed when progress reaches 100%  
✅ **State Persistence**: All state persisted to localStorage  
✅ **Data Seeding**: Initial member data from randomuser.me API  

### Bonus Features

✅ **Auto-reset Inactivity**: Users automatically set to Offline after 10 minutes of inactivity  
✅ **Chart Visualization**: Pie chart showing status distribution  
✅ **Dark Mode**: Full dark mode support with persistence  

## Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Role toggle, user switcher, dark mode
│   ├── MemberCard.jsx          # Member display card with status badge
│   ├── StatusSelector.jsx      # Status update buttons for members
│   ├── TaskForm.jsx            # Task assignment form for leads
│   ├── TaskList.jsx            # Task list with progress controls
│   ├── SummaryChips.jsx        # Status summary chips
│   └── StatusChart.jsx         # Pie chart for status distribution
├── pages/
│   └── Dashboard.jsx           # Main dashboard with role-aware views
├── redux/
│   ├── slices/
│   │   ├── roleSlice.js        # Role and current user state
│   │   └── membersSlice.js     # Members, tasks, filters, sorting
│   └── store.js                # Redux store configuration
├── utils/
│   ├── date.js                 # Date formatting utilities
│   ├── storage.js               # localStorage helpers
│   └── seedData.js             # Data seeding from randomuser.me
├── App.jsx                      # Main app component
├── main.jsx                     # Entry point
└── index.css                    # Tailwind CSS imports
```

## Setup & Installation

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd team-pulse-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

### Team Lead View

1. **Toggle Role**: Use the toggle switch in the header to switch to "Team Lead" view
2. **Monitor Status**: View all team members with their current status and active task counts
3. **Assign Tasks**: Use the "Assign New Task" form to assign tasks to team members
4. **Filter & Sort**: Use the filter dropdown to filter by status, and sort by active tasks
5. **View Charts**: See status distribution in the pie chart

### Team Member View

1. **Toggle Role**: Use the toggle switch in the header to switch to "Team Member" view
2. **Select User**: Choose your user from the dropdown (for demo purposes)
3. **Update Status**: Click status buttons (Working, Break, Meeting, Offline) to update your status
4. **Manage Tasks**: View your assigned tasks and update progress using +/- 10% buttons
5. **Track Progress**: Tasks automatically complete when progress reaches 100%

## State Management

### Redux Slices

#### `roleSlice`
- `currentRole`: 'lead' | 'member'
- `currentUser`: member ID string

#### `membersSlice`
- `members`: Array of member objects with tasks
- `filters`: Status filter state
- `sortBy`: Sorting preference
- `lastInteractionAtByUser`: Timestamp tracking for auto-reset

### Persistence

All state is automatically persisted to localStorage:
- Role and current user preferences
- Member data and tasks
- Dark mode preference
- Interaction timestamps

## API Integration

The app uses the [randomuser.me](https://randomuser.me/) API to seed initial member data. No API keys or authentication required.

## Accessibility

- Keyboard navigable status buttons and form inputs
- ARIA labels for progress controls
- Semantic HTML structure
- Focus management for interactive elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

### Auto-Reset Feature

The app includes an auto-reset feature that sets users to "Offline" after 10 minutes of inactivity. This is implemented via:
- Interaction timestamps recorded on all status/task updates
- Background interval checking every minute
- Automatic status update for inactive users

### Task Progress

- Progress updates in 10% increments
- Automatically clamped between 0-100%
- Auto-completion when progress reaches 100%
- Completed tasks excluded from active task counts

## License

MIT License - feel free to use this project for learning or as a starting point for your own applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Screenshots

### Team Lead View
- Member status monitoring
- Task assignment form
- Status distribution chart
- Filter and sort controls

### Team Member View
- Status update buttons
- Task list with progress bars
- Active and completed task sections

## Demo

Live deployment available at: [Add your deployment URL here]

## Future Enhancements

- [ ] Unit tests for Redux slices
- [ ] Component tests for TaskList and SummaryChips
- [ ] Real-time collaboration features
- [ ] Task comments and attachments
- [ ] Notification system
- [ ] Export functionality

