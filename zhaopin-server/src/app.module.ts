import { ReportModule } from './report/report.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VitaModule } from './vita/vita.module';
import { ConfigModule } from '@nestjs/config';

// console.log('process.env.RUNNING_ENV', process.env.RUNNING_ENV);
// export const IS_PROD = process.env.RUNNING_ENV !== 'dev';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: ['.env.dev', '.env.prod'],
    // }),
    VitaModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
