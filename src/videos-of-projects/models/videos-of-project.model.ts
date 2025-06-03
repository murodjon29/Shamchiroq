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
  @ForeignKey(() => Projects)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  project_id: number;

  @BelongsTo(() => Projects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  projects: Projects;

  @Column({
    type: DataType.STRING,
  })
  video_url: string;
}
