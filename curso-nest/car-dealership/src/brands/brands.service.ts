import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Array<Brand> = [];

  create(createBrandDto: CreateBrandDto) {
    const brand = {
      id: uuid(),
      createAt: new Date().getTime(),
      ...createBrandDto,
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Car with id '${id}' not found.`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let updateBrand = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        updateBrand = {
          ...updateBrand,
          ...updateBrandDto,
          updateAt: new Date().getTime(),
        };
        return updateBrand;
      }
      return brand;
    });
    return updateBrand;
  }

  remove(id: string) {
    const removeBrand = this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== removeBrand.id);
  }

  fillBrandsWithDbData(brands: Array<Brand>) {
    this.brands = brands;
  }
}
