import { ReportService } from './report.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  postRecord(@Body() record:any):any{
    return this.reportService.postRecord(record);
  }
}
