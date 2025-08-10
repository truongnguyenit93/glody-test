// assets.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AssetsService } from './../services/assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('sync-now')
  async syncAssetsNow() {
    return await this.assetsService.syncAssetsFromAPI();
  }
}
