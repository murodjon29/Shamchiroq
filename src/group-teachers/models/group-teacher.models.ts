import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Groups } from 'src/groups/models/group.model';
import { Lessons } from 'src/lesson/models/lesson.model';
import { Teachers } from 'src/teachers/models/teacher.model';

@Table({ tableName: 'grops_teachers' })
export class Groups_teachers extends Model {
  @ForeignKey(() => Teachers)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  teacher_id: number;

  @ForeignKey(() => Groups)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  group_id: number;

  @ForeignKey(() => Lessons)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  lesson_id: number;
}
