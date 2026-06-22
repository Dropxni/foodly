import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('foods')
export class Food {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column()
  image!: string;

  @Column({
    default: true,
  })
  isAvailable!: boolean;
}
