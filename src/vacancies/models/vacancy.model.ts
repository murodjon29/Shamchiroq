import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'vacancies' })
export class Vacancies extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  company_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  specialist: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  salary: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
}
