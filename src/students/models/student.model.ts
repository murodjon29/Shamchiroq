import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Group_students } from 'src/group-students/models/group-student.model';
import { Projects } from 'src/projects/models/project.model';
import { Students_projects } from 'src/student-project/model/student-project.entity';

@Table({ tableName: 'students' })
export class Students extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  adress: string;

  @BelongsToMany(() => Projects, () => Students_projects)
  projects: Projects[];

  @HasMany(() => Group_students)
  group_students: Group_students[];
}
