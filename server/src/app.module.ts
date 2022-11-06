import { ReportModule } from './report/report.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VitaModule } from './vita/vita.module';

@Module({
  imports: [VitaModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
