import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { UserRepository } from '../data-access';
import { Result } from '../../../shared/error';
import { User } from '../domain';
import { allUsers } from '../__mocks__/data_access/get-users-mock';
import { GetUsers } from './get-users';
import { UserRepositoryMock } from '../__mocks__/data_access/user-repo-mock';
import { ErrorCodes } from '../utils/error-codes';
import { beforeEach } from 'node:test';

describe('GetUsers Use Case', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    // Arrange
    const getUsers = new GetUsers(new UserRepositoryMock());
    const getUsersSpy = jest.spyOn(UserRepositoryMock.prototype, 'getUsers');

    // Act
    const result = await getUsers.execute();

    // Assert
    expect(getUsersSpy).toBeCalled();
    expect(result).toBeInstanceOf(Result);
    expect(result.Ok()).toBeDefined();
    expect(result.Ok()).toEqual(allUsers);
  });

  it('should return an error result when an error occurs', async () => {
    // Arrange
    const getUsers = new GetUsers(new UserRepositoryMock());
    const getUsersSpy = jest
      .spyOn(UserRepositoryMock.prototype, 'getUsers')
      .mockResolvedValue(
        new Result({
          error: {
            original_error: new Error(''),
            code: ErrorCodes.GET_ALL_USERS_FAILED
          }
        })
      );

    // Act
    const result = await getUsers.execute();

    // Assert
    expect(getUsersSpy).toBeCalled();
    expect(getUsersSpy).not.toThrow();
    expect(result).toBeInstanceOf(Result);
    expect(result.Error()).toBeDefined();
    expect(result.Error()!.code).toEqual(ErrorCodes.GET_ALL_USERS_FAILED);
  });
});
