import { describe, expect, it } from '@jest/globals';
import { UserMapper } from './user-mapper';
import {
  db_entity,
  domain_entity
} from '../__mocks__/mappers/user-mapper-mock';

describe('User Mapper', () => {
  it('should return a db entity when a domain entity is passed', () => {
    // Arrange
    const { emailVerified, ...desired_data } = db_entity;
    const mapper = new UserMapper();

    // Act
    const result = mapper.toDBEntity(domain_entity);

    // Assert
    expect(result).toMatchObject(desired_data);
  });

  it('should return a domain entity when a db entity is passed', () => {
    // Arrange
    const { id, active, ...desired_data } = domain_entity;
    const mapper = new UserMapper();

    // Act
    const result = mapper.toDomain(db_entity);

    // Assert
    expect(result).toMatchObject(desired_data);
  });
});
