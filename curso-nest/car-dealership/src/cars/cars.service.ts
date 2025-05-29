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
  private cars: Array<Car> = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corrolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];
  getAllCars() {
    return this.cars;
  }

  getCarsById(id: string) {
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
    let updateCar = this.getCarsById(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException();
    }

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        updateCar = { ...car, ...updateCarDto, id };
        return updateCar;
      }
      return car;
    });

    return updateCar;
  }

  delete(id: string) {
    const deleteCar = this.getCarsById(id);
    this.cars = this.cars.filter((car) => car.id !== deleteCar.id);
  }
}
