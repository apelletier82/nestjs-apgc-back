import { Injectable } from '@nestjs/common';
import * as usersData from 'mocks/database/users.json';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  private data: User[] = usersData;

  private getNewId(): number {
    let id = this.data.length;
    while (this.userExists(id)) {
      id++;
    }
    return id;
  }

  getUserList(): User[] {
    return this.data;
  }

  getUser(id: number): User {
    return this.data.find((user) => user.id === id);
  }

  userExists(id: number): boolean {
    return !!this.data.find((user) => user.id === id);
  }

  createUser(username: string, fullName?: string, email?: string): User {
    const newUser = {
      id: this.getNewId(),
      username,
      fullName,
      email,
    } as User;

    this.data.push(newUser);

    return newUser;
  }

  updateUser(id: number, user: User): User {
    if (!this.userExists(id)) {
      return null;
    }

    const userToModify = {
      ...this.getUser(id),
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    };
  }

  deleteUser(id: number): boolean {
    if (this.userExists(id)) {
      const index = this.data.indexOf(this.getUser(id));
      if (index > -1) {
        this.data.splice(index);
        return true;
      }
    }
    return false;
  }
}
