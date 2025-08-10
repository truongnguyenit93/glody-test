import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AssetsModule } from './modules/assets.module';
import { LocationsModule } from './modules/locations.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AssetsModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
