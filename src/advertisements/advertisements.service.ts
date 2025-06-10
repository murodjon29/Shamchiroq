import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Advertisements } from './models/advertisement.models';
import { InjectModel} from '@nestjs/sequelize';
import { handleError } from 'src/helpers/responseError';
import { successRes } from 'src/helpers/success-response';


@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectModel(Advertisements)
    private advertisementModel: typeof Advertisements,
    ){}
  async create(createAdvertisementDto: CreateAdvertisementDto): Promise<object> {
    try {
      const advertisement = await this.advertisementModel.create({...createAdvertisementDto})
      return successRes(advertisement, 201)
     } catch (error) {
      return handleError(error)
    }
  }

  async findAll(): Promise<object>{
    try {
      const advertisements = await this.advertisementModel.findAll({include: {all: true}});
      return successRes(advertisements)
    } catch (error) {
       return handleError(error)
    }
  }

  async findOne(id: number) :Promise <object>{
    try {
      const advertisement= await this.advertisementModel.findByPk(id);
      if (!advertisement){
        throw new NotFoundException(`User from ID ${id} not found`); 
      }
      return successRes(advertisement);
      
    } catch (error) {
      return handleError(error)
    }
  }

  async update(id: number, updateAdvertisementDto: UpdateAdvertisementDto) : Promise<object>{
    try {
     const advertisement = await this.advertisementModel.findByPk(id)
    if(!advertisement) throw new NotFoundException("advertisement Not found");
    const update = await this.advertisementModel.update(updateAdvertisementDto, {where: {id}, returning: true})
    return successRes(update[1][0])
    } catch (error) {
      return handleError(error)
    }
  }
 
  async remove(id: number):Promise<object>{
    try {
      if(!await this.advertisementModel.findByPk(id)) throw new NotFoundException("Not found");
      await this.advertisementModel.destroy({where: {id}})
      return successRes({messagae: "Deleted successFuly"})
    } catch (error) {
      return handleError(error)
    }
  }
}
