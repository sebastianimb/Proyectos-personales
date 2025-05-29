import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandService: BrandsService,
  ) {}
  pupulateDB() {
    this.carsService.fillCarsWithDbData(CARS_SEED);
    this.brandService.fillBrandsWithDbData(BRANDS_SEED);
    return 'Seed executed...';
  }
}
