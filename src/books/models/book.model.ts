import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Teachers } from 'src/teachers/models/teacher.model';

@Table({ tableName: 'books' })
export class Books extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Teachers)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  teacher_id: number;

  @BelongsTo(() => Teachers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  teacher: Teachers;
}
