import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/enum';

@Table({ tableName: 'admins' })
export class Admins extends Model {
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
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: Role.ADMIN,
  })
  role: Role;
}
