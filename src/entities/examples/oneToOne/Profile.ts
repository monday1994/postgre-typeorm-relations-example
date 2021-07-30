import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Student} from './Student';

@Entity()
export class Profile {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @OneToOne(() => Student, student => student.profile)
  student: Student;
}
