import { User } from '../../domain';

export const allUsers: User[] = [
  User.create('mock-id', {
    first_name: 'test1',
    last_name: 'Doe',
    username: 'testz',
    email: {
      value: 'test1@gmail.com'
    }
  }),

  User.create('mock-id2', {
    first_name: 'test2',
    last_name: 'Doe',
    username: 'testz2',
    email: {
      value: 'test2@gmail.com'
    }
  })
];
