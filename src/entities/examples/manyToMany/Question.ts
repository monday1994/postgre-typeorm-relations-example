import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {Category} from './Category';

@Entity()
export class Question {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(type => Category, category => category.questions)
  @JoinTable({name: 'question_category'})
  categories: Category[];
}
