import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Groups } from './models/group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { handleError } from 'src/helpers/responseError';
import { successRes } from 'src/helpers/success-response';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Groups) private model: typeof Groups) {}

  async create(createGroupDto: CreateGroupDto): Promise<object> {
    try {
      const group = await this.model.create(createGroupDto as any);
      return successRes(group, 201);
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll(): Promise<object> {
    try {
      const groups = await this.model.findAll({ include: { all: true } });
      return successRes(groups);
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const group = await this.model.findByPk(id, { include: { all: true } });
      if (!group) {
        throw new NotFoundException('Group not found');
      }
      return successRes(group);
    } catch (error) {
      return handleError(error);
    }
  }

  async update(id: number, updategroupDto: UpdateGroupDto): Promise<object> {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Group not found');
      }

      const group = await this.model.update(updategroupDto, {
        where: { id },
        returning: true,
      });
      return successRes(group[1][0]);
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('group not found');
      }

      await this.model.destroy({ where: { id } });
      return successRes({ message: 'Delted successfully' });
    } catch (error) {
      return handleError(error);
    }
  }
}
