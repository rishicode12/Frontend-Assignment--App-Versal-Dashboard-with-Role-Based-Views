/**
 * Format ISO date string to readable format
 * @param {string} isoString - ISO date string
 * @returns {string} Formatted date string (e.g., "Jan 15, 2024")
 */
export const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Check if a task is due soon (within 3 days)
 * @param {string} dueDate - ISO date string
 * @returns {boolean} True if due within 3 days
 */
export const isDueSoon = (dueDate) => {
  if (!dueDate) return false;
  const due = new Date(dueDate);
  const now = new Date();
  const diffTime = due - now;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 3;
};

/**
 * Check if a task is overdue
 * @param {string} dueDate - ISO date string
 * @returns {boolean} True if past due date
 */
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const due = new Date(dueDate);
  const now = new Date();
  return due < now;
};

