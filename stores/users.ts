import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'users',
  state: (): { users: User[] } => ({
    users: [],
  }),
  getters: {
    getUsers: (store) => {
      return store.users.map((x) => ({ ...x, action: 'delete' }));
    },
  },
  actions: {
    async fetchUsers() {
      this.users = await fetch('/api/users').then((res) => res.json());
    },
    async addUser({ name, address }: NewUser) {
      const newUser = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address }),
      }).then((res) => res.json());

      this.users.push(newUser);
    },
    async searchTerm(searchTerm: string) {
      try {
        const filteredUsers = await fetch(
          `/api/users?search=${encodeURIComponent(searchTerm)}`
        ).then((res) => res.json());

        return filteredUsers;
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
