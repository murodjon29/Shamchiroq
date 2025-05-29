import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Students_projects } from 'src/student-project/model/student-project.entity';
import { Students } from 'src/students/models/student.model';
import { Videos_of_project } from 'src/videos-of-projects/models/videos-of-project.model';

@Table({ tableName: 'projects' })
export class Projects extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => Students, () => Students_projects)
  students: Students[];

  @HasMany(() => Videos_of_project)
  Videos_of_projects: Videos_of_project[];
}
