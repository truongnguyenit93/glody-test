import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AssetsService } from '../services/assets.service';

@Injectable()
export class AssetsCron {
    private readonly logger = new Logger(AssetsCron.name);

    constructor(private readonly assetsService: AssetsService) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleAssetsSync() {
    try {
        this.logger.log('Starting assets synchronization...');
        await this.assetsService.syncAssetsFromAPI();
        this.logger.log('Assets synchronization completed successfully.');
    } catch (error) {
        this.logger.error('Error during assets synchronization:', error);
    }
    }
}
