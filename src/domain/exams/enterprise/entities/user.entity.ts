import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserProps {
  email: string;
  name: string;
  password: string;
  role: Role;
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
      },
      id,
    );

    return user;
  }
}
