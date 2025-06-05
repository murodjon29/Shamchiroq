import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Books } from 'src/books/models/book.model';
import { Groups_teachers } from 'src/group-teachers/models/group-teacher.models';
import { Groups } from 'src/groups/models/group.model';
import { Videos_of_teachers } from 'src/videos-of-teachers/models/videos-of-teacher.model';

@Table({ tableName: 'teachers' })
export class Teachers extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
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
  specialist: string;

  @BelongsToMany(() => Groups, () => Groups_teachers)
  groups: Groups[];

  @HasMany(() => Books)
  books: Books[];

  @HasMany(() => Videos_of_teachers)
  videos_of_teachers: Videos_of_teachers[];
  video: any;
}
