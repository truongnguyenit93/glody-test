import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsRepository } from './../repositorys/assets.repository';
import { LocationsService } from '../services/locations.service';


@Injectable()
export class AssetsService {
    private readonly logger = new Logger(AssetsService.name);
    private readonly apiUrl = 'https://669ce22d15704bb0e304842d.mockapi.io/assets';

    constructor(
        @InjectRepository(AssetsRepository)
        private readonly assetsRepo: AssetsRepository,
        private readonly locationsService: LocationsService,
        private readonly httpService: HttpService
    ) {}
     
    async syncAssetsFromAPI() {
        this.logger.log('Fetching assets from API...');
        const response = await this.httpService.get(this.apiUrl).toPromise();
        if (!response || !response.data) {
            this.logger.error('No data received from API');
            return;
        }

        const assetsData = response.data;

        for (const asset of assetsData) {
            try {
                this.logger.log(`Processing asset: ${asset.serial}`);
                const location = await this.locationsService.findById(asset?.location_id);
                if (!location) continue;

                const exists = await this.assetsRepo.findByLocationId(location.id);
                if (!exists && new Date(asset.created_at) <= new Date()) {
                    await this.assetsRepo.save({
                        name: asset.name,
                        type: asset.type,
                        location: location,
                        createdAt: asset.createdAt
                    });
                    this.logger.log(`Asset ${asset.serial} created successfully.`);
                }
            } catch (error) {
                this.logger.error(`Error processing asset ${asset.serial}:`, error);
                continue;
            }
        }
        this.logger.log('Assets synchronization completed.');
    }
}
