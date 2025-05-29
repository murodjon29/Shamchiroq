import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Groups } from 'src/groups/models/group.model';
import { Students } from 'src/students/models/student.model';

@Table({ tableName: 'group_students' })
export class Group_students extends Model {
  @ForeignKey(() => Groups)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  group_id: number;

  @BelongsTo(() => Groups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  group: Groups;

  @ForeignKey(() => Students)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  student_id: number;

  @BelongsTo(() => Students, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  student: Students;
}
