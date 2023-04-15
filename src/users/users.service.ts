import { Body, HttpStatus, Injectable } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { User } from '../typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from '../utils/types';

@ApiTags('users')
@Injectable()
export class UsersService {
  private readonly users: User[];
  constructor() {
    this.users = [];
  }
  createUser(@Body() createUserDto: CreateUserParams) {
    const user = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }
  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    const user = this.users.find(
      (user) => user.id.toString() === id.toString(),
    );
    if (!user) {
      console.log(`User with ID ${id} not found`);
      return null;
    }
    return (this.users[this.users.indexOf(user)] = {
      ...user,
      ...updateUserDetails,
    });
  }
  getUserById(id: number): User {
    const user = this.users.find(
      (user) => user.id.toString() === id.toString(),
    );
    if (!user) {
      console.log(`User with ID ${id} not found`);
      return null;
    }
    console.log('user found:', user);
    return user;
  }
  deleteUserById(id: number) {
    const user = this.users.find(
      (user) => user.id.toString() === id.toString(),
    );
    if (!user) {
      console.log(`User with ID ${id} not found`);
      return null;
    }
    this.users.splice(this.users.indexOf(user), 1);
    return HttpStatus.OK;
  }
}
