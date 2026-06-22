import { Food } from '../../foods/entities/food.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  active!: boolean;

  @OneToMany(() => Food, (food) => food.category)
  foods!: Food[];
}
