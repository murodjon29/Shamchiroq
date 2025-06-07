import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Projects } from './models/project.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { handleError } from 'src/helpers/responseError';
import { successRes } from 'src/helpers/success-response';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Projects) private model: typeof Projects) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const project = await this.model.create(createProjectDto as any);
      return successRes(project, 201);
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll() {
    try {
      const projects = await this.model.findAll({ include: { all: true } });
      return successRes(projects);
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const project = await this.model.findByPk(id, { include: { all: true } });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return successRes(project);
    } catch (error) {
      return handleError(error);
    }
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<object> {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Project not found');
      }

      const updatedProject = await this.model.update(updateProjectDto, {
        where: { id },
        returning: true,
      });
      return successRes(updatedProject[1][0]);
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Project not found');
      }

      await this.model.destroy({ where: { id } });
      return successRes({ message: 'Deleted Successfully' });
    } catch (error) {
      return handleError(error);
    }
  }
}
