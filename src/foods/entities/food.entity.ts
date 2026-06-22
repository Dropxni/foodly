import { Category } from '../../categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column()
  image!: string;

  @Column({ default: true })
  isAvailable!: boolean;

  @ManyToOne(() => Category, (category) => category.foods, { nullable: false })
  category!: Category;
}
