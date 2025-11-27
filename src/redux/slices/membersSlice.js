import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [],
  filters: {
    status: null, // 'Working' | 'Break' | 'Meeting' | 'Offline' | null
  },
  sortBy: null, // 'activeTasksDesc' | null
  lastInteractionAtByUser: {}, // Record<memberId, timestamp>
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    restoreState: (state, action) => {
      // Restore full state from localStorage
      if (action.payload.members) {
        state.members = action.payload.members;
      }
      if (action.payload.lastInteractionAtByUser) {
        state.lastInteractionAtByUser = action.payload.lastInteractionAtByUser;
      }
    },
    setStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        member.status = status;
        // Record interaction timestamp
        state.lastInteractionAtByUser[memberId] = Date.now();
      }
    },
    addTask: (state, action) => {
      const { memberId, title, dueDate } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        const newTask = {
          id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title,
          dueDate,
          progress: 0,
          completed: false,
          createdAt: new Date().toISOString(),
        };
        member.tasks.push(newTask);
        // Record interaction timestamp
        state.lastInteractionAtByUser[memberId] = Date.now();
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, delta } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        const task = member.tasks.find((t) => t.id === taskId);
        if (task && !task.completed) {
          // Clamp progress between 0 and 100
          task.progress = Math.max(0, Math.min(100, task.progress + delta));
          // Auto-complete when progress reaches 100
          if (task.progress >= 100) {
            task.completed = true;
            task.progress = 100;
          }
          // Record interaction timestamp
          state.lastInteractionAtByUser[memberId] = Date.now();
        }
      }
    },
    completeTask: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        const task = member.tasks.find((t) => t.id === taskId);
        if (task) {
          task.completed = true;
          task.progress = 100;
          // Record interaction timestamp
          state.lastInteractionAtByUser[memberId] = Date.now();
        }
      }
    },
    deleteTask: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        member.tasks = member.tasks.filter((t) => t.id !== taskId);
        // Record interaction timestamp
        state.lastInteractionAtByUser[memberId] = Date.now();
      }
    },
    setFilterStatus: (state, action) => {
      state.filters.status = action.payload;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload;
    },
    recordInteraction: (state, action) => {
      const { memberId, timestamp } = action.payload;
      state.lastInteractionAtByUser[memberId] = timestamp;
    },
    // Auto-reset: set inactive users to Offline
    resetInactiveUsers: (state, action) => {
      const { inactiveThreshold } = action.payload; // timestamp threshold
      state.members.forEach((member) => {
        const lastInteraction = state.lastInteractionAtByUser[member.id] || 0;
        if (lastInteraction < inactiveThreshold && member.status !== 'Offline') {
          member.status = 'Offline';
        }
      });
    },
  },
});

export const {
  setMembers,
  restoreState,
  setStatus,
  addTask,
  updateTaskProgress,
  completeTask,
  deleteTask,
  setFilterStatus,
  setSort,
  recordInteraction,
  resetInactiveUsers,
} = membersSlice.actions;
export default membersSlice.reducer;

