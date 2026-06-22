import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}

  async create(createFoodDto: CreateFoodDto) {
    const food = this.foodRepository.create(createFoodDto);

    return await this.foodRepository.save(food);
  }

  async findAll() {
    return await this.foodRepository.find();
  }

  async findOne(id: number) {
    const food = await this.foodRepository.findOneBy({ id });

    if (!food) {
      throw new NotFoundException(`Comida con el id ${id} no encontrada`);
    }

    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.findOne(id);

    const updatedFood = this.foodRepository.merge(food, updateFoodDto);

    return await this.foodRepository.save(updatedFood);
  }

  async remove(id: number) {
    const food = await this.findOne(id);

    await this.foodRepository.remove(food);

    return {
      message: 'Food deleted successfully',
    };
  }
}
