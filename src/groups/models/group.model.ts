import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Group_students } from 'src/group-students/models/group-student.model';
import { Groups_teachers } from 'src/group-teachers/models/group-teacher.models';
import { Teachers } from 'src/teachers/models/teacher.model';

@Table({ tableName: 'group' })
export class Groups extends Model {
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

  @BelongsToMany(() => Teachers, () => Groups_teachers)
  teachers: Teachers[];

  @HasMany(() => Group_students)
  group_students: Group_students[];
}
