import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReportsService {
  constructor(private readonly usersService: UsersService) {}

  async getUsersReport() {
    return this.usersService.findAllForReports();
  }

  async getUserCount() {
    const users = await this.usersService.findAll();
    return {
      totalUsers: users.length,
    };
  }

  async getSummary() {
    const users = await this.usersService.findAll();

    return {
      generatedAt: new Date(),
      totalUsers: users.length,
    };
  }
}
