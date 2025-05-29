import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'advertisements' })
export class Advertisements extends Model {
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
}
