/**
 * Seed initial member data from randomuser.me API
 * @returns {Promise<Array>} Array of normalized member objects
 */
export const seedMembers = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=8');
    const data = await response.json();

    const avatarList = [
      '/avatars/avatar-dylan.svg',
      '/avatars/avatar-female1.svg',
      '/avatars/avatar-businessman.svg',
      '/avatars/avatar-man-mustache.svg',
      '/avatars/avatar-female2.svg',
    ];

    return data.results.map((user, index) => ({
      id: `member-${user.login.uuid}`,
      name: `${user.name.first} ${user.name.last}`,
      avatar: avatarList[index % avatarList.length],
      email: user.email,
      status: 'Offline',
      tasks: [],
    }));
  } catch (error) {
    console.error('Error seeding members:', error);
    // Return fallback data if API fails
    const avatarList = [
      '/avatars/avatar-dylan.svg',
      '/avatars/avatar-female1.svg',
      '/avatars/avatar-businessman.svg',
      '/avatars/avatar-man-mustache.svg',
      '/avatars/avatar-female2.svg',
    ];
    return [
      {
        id: 'member-1',
        name: 'John Doe',
        avatar: avatarList[0],
        email: 'john.doe@example.com',
        status: 'Offline',
        tasks: [],
      },
      {
        id: 'member-2',
        name: 'Jane Smith',
        avatar: avatarList[1],
        email: 'jane.smith@example.com',
        status: 'Offline',
        tasks: [],
      },
    ];
  }
};

export const DEFAULT_AVATAR_PATH = '/avatars/avatar-dylan.svg';

