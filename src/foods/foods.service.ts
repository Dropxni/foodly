import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import {
  CloudinaryService,
  MulterFile,
} from '../cloudinary/cloudinary.service';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createFoodDto: CreateFoodDto, file?: MulterFile) {
    const category = await this.categoryRepository.findOneBy({
      id: createFoodDto.category,
    });
    if (!category) throw new NotFoundException('categoria no encontrada');

    const imageUrl = file
      ? await this.cloudinaryService.uploadImage(file)
      : createFoodDto.image;

    const food = this.foodRepository.create({
      ...createFoodDto,
      category,
      image: imageUrl,
    });
    return this.foodRepository.save(food);
  }

  async findAll() {
    return this.foodRepository.find();
  }

  async findOne(id: number) {
    const food = await this.foodRepository.findOneBy({ id });
    if (!food)
      throw new NotFoundException(`comida con el id ${id} no encontrada`);
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto, file?: MulterFile) {
    const food = await this.foodRepository.findOneBy({ id });
    if (!food)
      throw new NotFoundException(
        `Error al actualizar comida, no se encontro la comida con el id ${id}`,
      );

    const category = await this.categoryRepository.findOneBy({
      id: updateFoodDto.category,
    });
    if (!category) throw new NotFoundException('categoria no encontrada');

    const imageUrl = file
      ? await this.cloudinaryService.uploadImage(file)
      : food.image;

    const updatedFood = this.foodRepository.merge(food, {
      ...updateFoodDto,
      category,
      image: imageUrl,
    });
    return this.foodRepository.save(updatedFood);
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
