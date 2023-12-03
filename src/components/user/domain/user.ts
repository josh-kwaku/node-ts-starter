import { DomainEntity } from '../../shared/interfaces';

export type UserProps = {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: {
    value: string;
    verified: boolean;
  };
  active?: boolean;
};

export class User extends DomainEntity {
  private first_name?: string;
  private last_name?: string;
  private username?: string;
  private email?: {
    value: string;
    verified: boolean;
  };
  private active?: boolean;

  private constructor(id: string, props: UserProps) {
    super(id);
    this.first_name = props.first_name;
    this.last_name = props.last_name;
    this.username = props.username;
    this.email = props.email;
    this.active = props.active;
  }

  public static create(id: string, props: UserProps) {
    return new User(id, props);
  }
}
