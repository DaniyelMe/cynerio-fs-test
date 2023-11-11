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
    addUser({ name, address }: NewUser) {
      console.log('name, address:', name, address)
      // this.users.push(user);
    },
    async fetchUsers() {
      this.users = await Promise.resolve([
        {
          date: new Date().toLocaleString(),
          name: 'Alice',
          address: '123 Maple Street',
        },
        {
          date: new Date().toLocaleString(),
          name: 'Bob',
          address: '456 Oak Avenue',
        },
        {
          date: new Date().toLocaleString(),
          name: 'Charlie',
          address: '789 Pine Lane',
        },
      ]);
    },
  },
});
