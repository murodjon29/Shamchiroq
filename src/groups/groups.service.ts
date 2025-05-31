import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {Groups} from './models/group.model'
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { handleError } from 'src/utils/responseError';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Groups) private model: typeof Groups) {}

  async create(createGroupDto: CreateGroupDto) {
    try {
      const group = await this.model.create(createGroupDto as any);
      return { statusCode: 201, message: 'Success', data: group };
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll() {
    try {
      const groups = await this.model.findAll({ include: { all: true } });
      return { statusCode: 200, message: 'Success', data: groups };
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const group = await this.model.findByPk(id, { include: { all: true } });
      if (!group) {
        throw new NotFoundException('Group not found');
      }
      return { statusCode: 200, message: 'Success', data: group };
    } catch (error) {
      return handleError(error);
    }
  }

  async update(id: number, updategroupDto: UpdateGroupDto ) {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Group not found');
      }

      const group = await this.model.update(updategroupDto, { where: { id },returning: true,
      });
      return { statusCode: 200, message: 'Success', data: group[1][0] };
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('group not found');
      }

      await this.model.destroy({ where: { id } });
      return { statusCode: 200, message: 'Success', data: {} };
    } catch (error) {
      return handleError(error);
    }
  }
}
