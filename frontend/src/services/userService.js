import { mockUsers, mockReports } from '../utils/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  getAllUsers: async () => {
    await delay(300);
    const stored = localStorage.getItem('users');
    if (!stored) {
      localStorage.setItem('users', JSON.stringify(mockUsers));
      return mockUsers;
    }
    return JSON.parse(stored);
  },

  updateUserStatus: async (id, status) => {
    await delay(400);
    const users = await userService.getAllUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    users[index].status = status; // Active / Suspended
    localStorage.setItem('users', JSON.stringify(users));
    return users[index];
  },

  getAllReports: async () => {
    await delay(300);
    const stored = localStorage.getItem('reports');
    if (!stored) {
      localStorage.setItem('reports', JSON.stringify(mockReports));
      return mockReports;
    }
    return JSON.parse(stored);
  },

  resolveReport: async (id) => {
    await delay(400);
    const reports = await userService.getAllReports();
    const index = reports.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Report not found');

    reports[index].status = 'Resolved';
    localStorage.setItem('reports', JSON.stringify(reports));
    return reports[index];
  }
};
