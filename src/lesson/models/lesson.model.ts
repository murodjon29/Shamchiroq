import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Groups_teachers } from 'src/group-teachers/models/group-teacher.models';

@Table({ tableName: 'lessons' })
export class Lessons extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lesson_topic: string;

  @Column({
    type: DataType.DATE,
    // allowNull: false
    defaultValue: Date.now(),
  })
  lesson_time: Date;

  @HasOne(() => Groups_teachers)
  groups_teacher: Groups_teachers;
}
