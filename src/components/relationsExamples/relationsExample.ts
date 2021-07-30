// TypeORM entities relations example

import { Response, Request, NextFunction, Router } from 'express';

//test
import { getRepository, getConnection } from 'typeorm';
import { Question } from '../../entities/examples/manyToMany/Question';
import { Category } from '../../entities/examples/manyToMany/Category';
import { Profile } from '../../entities/examples/oneToOne/Profile';
import { Student } from '../../entities/examples/oneToOne/Student';
import { Owner } from '../../entities/examples/oneToMany/Owner';
import { Car } from '../../entities/examples/oneToMany/Car';

const createManyToMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { questionTitle, categoryName } = req.body;

  try {
    const category1 = new Category();
    category1.name = categoryName;

    const question1 = new Question();
    question1.title = questionTitle;

    //relation add
    question1.categories = [category1];

    const createdCategory = await getRepository(Category).save(category1);
    const createdQuestion = await getRepository(Question).save(question1);

    res.status(200);
    res.json({
      message: 'ok',
      createdQuestion,
      createdCategory,
    });
  } catch (err) {
    console.log('err in relations = ', err);
  }
};

const getManyToMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const questionsWithCategories = await getRepository(Question)
    .createQueryBuilder('question')
    .leftJoinAndSelect('question.categories', 'category')
    .getMany();

  const categoriesWithQuestion = await getRepository(Category)
    .createQueryBuilder('category')
    .leftJoinAndSelect('category.questions', 'question')
    .where('category.name = :id', { id: 2 })
    .getOne();

  res.status(200);
  res.json({
    message: 'ok',
    questionsWithCategories,
    categoriesWithQuestion,
  });
};

const createOneToOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { profileAge, studentName } = req.body;

  const profile = new Profile();
  profile.age = profileAge;

  const student = new Student();
  student.name = studentName;
  student.profile = profile;

  const newProfile = await getRepository(Profile).save(profile);
  const connection = getConnection();
  const newStudent = await connection.manager.save(student);

  res.status(200);
  res.json({
    message: 'oks',
    newProfile,
    newStudent,
  });
};

const getOneToOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const profiles = await getRepository(Profile)
    .createQueryBuilder('profile')
    .leftJoinAndSelect('profile.student', 'student')
    .getMany();

  const students = await getRepository(Student)
    .createQueryBuilder('student')
    .leftJoinAndSelect('student.profile', 'profile')
    .getMany();

  res.status(200);
  res.json({
    message: 'ok',
    profiles,
    students,
  });
};

const createOneToMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { ownerName, carType } = req.body;

  const newCar = new Car();
  newCar.model = carType;

  const carCreationResult = await getRepository(Car).save(newCar);

  const newOwner = new Owner();
  newOwner.name = ownerName;

  newOwner.cars = [newCar];

  const ownerCreationResult = await getRepository(Owner).save(newOwner);

  res.status(200);
  res.json({
    message: 'ok',
    carCreationResult,
    ownerCreationResult,
  });
};

const getOneToMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const ownerWithCars = await getRepository(Owner)
    .createQueryBuilder('owner')
    .leftJoinAndSelect('owner.cars', 'car')
    .getMany();

  const carWithOwner = await getRepository(Car)
    .createQueryBuilder('car')
    .leftJoinAndSelect('car.owner', 'owner')
    .getOne();

  res.status(200);
  res.json({
    message: 'ok',
    ownerWithCars,
    carWithOwner
  });
};

//routing

const router = Router();
router.post('/one-to-one', createOneToOne);
router.get('/one-to-one', getOneToOne);

router.post('/one-to-many', createOneToMany);
router.get('/one-to-many', getOneToMany);

router.post('/many-to-many', createManyToMany);
router.get('/many-to-many', getManyToMany);

export default router;
