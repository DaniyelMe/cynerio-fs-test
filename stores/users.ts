import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'users',
  state: (): { users: User[]; currentSearched: User[] } => ({
    users: [],
    currentSearched: [],
  }),
  getters: {
    getUsers: (store) => {
      return store.users.map((x) => ({ ...x, action: 'delete' }));
    },
  },
  actions: {
    async fetchUsers() {
      const userRes = await fetch('/api/users');
      this.users = await userRes.json();
    },
    async addUser({ name, address }: NewUser) {
      const newUserRes = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address }),
      });

      const newUser = await newUserRes.json();
      this.users.push(newUser);
    },
    async searchTerm(searchTerm: string) {
      try {
        const filteredUsersRes = await fetch(
          `/api/users?search=${encodeURIComponent(searchTerm)}`
        );
        const filteredUsers = await filteredUsersRes.json();

        this.currentSearched = filteredUsers;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async deleteUser(userId: number) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          this.users = this.users.filter((user: User) => user.id !== userId);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
});
