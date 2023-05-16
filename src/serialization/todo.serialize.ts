import { PROJECT_SERIALIZE } from './project.serialize';
import { USER_SERIALIZE } from './user.serialize';

export const TODO_SERIALIZE = {
  id: true,
  name: true,
  status: true,
  due_date: true,
  user: USER_SERIALIZE,
  project: PROJECT_SERIALIZE,
  created_at: true,
};
