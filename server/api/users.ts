import { defineEventHandler } from 'h3';

import { getUserService } from '../services/userService';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const userService = getUserService();
    return userService.addUser(await readBody(event));
  }

  if (event.req.method === 'GET') {
    const userService = getUserService();
    const query = getQuery(event);

    if (query.search) {
      return userService.searchUsers(query?.search as string);
    } else {
      return userService.getUsers();
    }
  }
});
