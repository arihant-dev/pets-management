import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor( 
    private dataSource: DataSource, 
    @InjectRepository(Pet) private petRepository: Repository<Pet>
  ){}
  create(createPetDto: CreatePetDto) {
    return this.petRepository.create(createPetDto);
  }

  findAll() {
    return this.petRepository.find;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
