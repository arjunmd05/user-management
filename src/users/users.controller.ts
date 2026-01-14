import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
  ) {}

  // 🔹 REPORTS (STATIC ROUTE — MUST COME FIRST)
  @Get('reports')
  async getReports() {
    const axiosResponse = await firstValueFrom(
      this.httpService.get('http://localhost:3001/reports/users'),
    );

    return axiosResponse.data;
  }

  // 🔹 USER CRUD
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
