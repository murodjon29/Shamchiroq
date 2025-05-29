import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Projects } from 'src/projects/models/project.model';
import { Students } from 'src/students/models/student.model';

@Table({ tableName: 'students_projects' })
export class Students_projects extends Model {
  @ForeignKey(() => Students)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  student_id: number;

  @ForeignKey(() => Projects)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  project_id: number;
}
