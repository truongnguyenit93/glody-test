import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsService } from '../services/assets.service';
import { AssetsRepository } from '../repositorys/assets.repository';
import { LocationsModule } from './locations.module';
import { AssetsCron } from '../crons/assets.cron';
import { Asset } from '../entitys/assets/asset.entity';
import { AssetsController } from '../controllers/assets.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        TypeOrmModule.forFeature([Asset]),
        LocationsModule,
        HttpModule, 
    ],
    controllers: [AssetsController],
    providers: [
        AssetsService,
        AssetsRepository,
        AssetsCron,
    ],
    exports: [
        AssetsService,
        AssetsRepository,
    ],
})
export class AssetsModule {}