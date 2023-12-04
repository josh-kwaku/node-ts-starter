import { describe, expect, it } from '@jest/globals';
import { User } from '.';

describe('Domain User Entity', () => {
  it('should create a user entity', () => {
    const user = User.create('mock-id', {
      first_name: 'test',
      last_name: 'Doe',
      username: 'doetest',
      email: { value: 'doetest@gmail.com' }
    });

    expect(user).toBeInstanceOf(User);
  });
});
