import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Projects } from './models/project.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { handleError } from 'src/helpers/responseError';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Projects) private model: typeof Projects) { }

  async create(createProjectDto: CreateProjectDto) {
    try {
      const project = await this.model.create(createProjectDto as any);
      return { statusCode: 201, message: 'Success', data: project };
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll() {
    try {
      const projects = await this.model.findAll({ include: { all: true } });
      return { statusCode: 200, message: 'Success', data: projects };
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
      return { statusCode: 200, message: 'Success', data: project };
    } catch (error) {
      return handleError(error);
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Project not found');
      }

      const [_, [updatedProject]] = await this.model.update(updateProjectDto, {
        where: { id },
        returning: true,
      });
      return { statusCode: 200, message: 'Success', data: updatedProject };
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Project not found');
      }

      await this.model.destroy({ where: { id } });
      return { statusCode: 200, message: 'Success', data: {} };
    } catch (error) {
      return handleError(error);
    }
  }

} 
