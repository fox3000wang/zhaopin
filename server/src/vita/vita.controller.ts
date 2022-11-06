import { VitaService } from './vita.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('vita')
export class VitaController {
  constructor(private readonly vitaService: VitaService) {}

  @Get()
  getRecord():any{
    return this.vitaService.getRecord();
  }

  @Post()
  postRecord(@Body() record:any):any{
    return this.vitaService.postRecord(record);
  }
}