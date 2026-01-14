import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('users')
  getUsersReport() {
    return this.reportsService.getUsersReport();
  }

  @Get('users/count')
  getUserCount() {
    return this.reportsService.getUserCount();
  }

  @Get('summary')
  getSummary() {
    return this.reportsService.getSummary();
  }
}
