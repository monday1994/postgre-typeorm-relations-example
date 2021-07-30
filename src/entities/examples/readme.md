# One to One

Relation can be uni or bi directional. 
To create bidirectional between A and B 
Such relation allows for selecting join of Profile => Student and Student => Profile

```ts
@Entity()
export class Profile {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @OneToOne(() => Student, student => student.profile)
  student: Student;
}

@Entity()
export class Student {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Profile, profile => profile.student)
  // join column have to be only on one side
  @JoinColumn()
  profile: Profile;
}
```

BUT while saving you need to do it like

```ts
const profile = new Profile();
  profile.age = profileAge;

  const student = new Student();
  student.name = studentName;
  
  // beacuse we define JoinColumn (FK) on Student entity
  student.profile = profile;
```

# One to many


