import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Array<Car> = [];
  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found.`);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = { id: uuid(), ...createCarDto };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let updateCar = this.findOne(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException();
    }

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        updateCar = { ...updateCar, ...updateCarDto, id };
        return updateCar;
      }
      return car;
    });

    return updateCar;
  }

  remove(id: string) {
    const deleteCar = this.findOne(id);
    this.cars = this.cars.filter((car) => car.id !== deleteCar.id);
  }

  fillCarsWithDbData(cars: Array<Car>) {
    this.cars = cars;
  }
}
