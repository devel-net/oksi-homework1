import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/UpdateUser.dto';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('create')
  @ApiOperation({ summary: 'Create a user' })
  @ApiProperty({
    description: 'Create a user',
  })
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateUserDto })
  getUsers(@Body() getUserDto: CreateUserDto) {
    return this.userService.createUser(getUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
