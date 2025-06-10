import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Projects } from 'src/projects/models/project.model';

@Table({ tableName: 'videos_of_project' })
export class Videos_of_project extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  video_url: string;

  @ForeignKey(() => Projects)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  project_id: number;

  @BelongsTo(() => Projects)
  project: Projects;
}
