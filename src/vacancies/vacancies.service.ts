import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { handleError } from 'src/helpers/responseError';
import { InjectModel } from '@nestjs/sequelize';
import { Vacancies } from './models/vacancy.model';
import { successRes } from 'src/helpers/success-response';


@Injectable()
export class VacanciesService {
  constructor(@InjectModel(Vacancies) private model: typeof Vacancies) { }
  async remove(id: number) : Promise<object>{
    try {
      if( !await this.model.findByPk(id)) throw new NotAcceptableException("Not Found");
      await this.model.destroy({where: {id}})
      return successRes({message: "Deleted successfully!"})
    } catch (error) {
      return handleError(error)
    }
  }

  async update(id: number, updateVacancyDto: UpdateVacancyDto): Promise<object> {
    try {
      const vacancy = await this.model.findByPk(id)
      if(!vacancy) throw new NotFoundException("vacancy not found ");
      const update = await this.model.update(updateVacancyDto, {where:{id}, returning:true})
      return successRes(update[1][0])
    } catch (error) {
      return handleError(error)
    }
  }

  async findOne(id: number) {
    try {
      const vacancy = await this.model.findByPk(id);
      if (!vacancy){
        throw new NotAcceptableException(`Vacancy from Id ${id} not found `);
      }
      return successRes(vacancy);

    } catch (error) {
      return handleError(error)
    }
  }

  async findAll(): Promise<object> {
    try {
      const vacancies = await this.model.findAll({include:{all: true}});
      return successRes(vacancies)      
    } catch (error) {
      return handleError(error)
    }
  }
  async create(createVacancyDto: CreateVacancyDto): Promise<object> {
    try {
      const vacancies = await this.model.create({...createVacancyDto})
      return successRes(vacancies, 201)
    } catch (error) {
      return handleError(error)      
    }
  }


   
}
