import { Injectable, NotFoundException } from '@nestjs/common';
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
  async create(createPetDto: CreatePetDto) {
    const petEntity = this.petRepository.create(createPetDto);
    const pet = await this.petRepository.save(petEntity);
    return pet;
  }

  async findAll() {
    return await this.petRepository.find();
  }

  async findOne(id: number) {
    const pet = await this.petRepository.findOneBy({id});
    if (!pet) {
      throw new NotFoundException(`The pet with ${id} not found`)
    }
    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    const pet = await this.petRepository.findOneBy({id});
    if (!pet) {
      throw new NotFoundException(`The pet with ${id} not found`)
    }
    return this.petRepository.save({id, ...updatePetDto});
  }

  async remove(id: number) {
    const pet = await this.petRepository.findOneBy({id});
    if (!pet) {
      throw new NotFoundException(`The pet with ${id} not found`)
    }
    return this.petRepository.remove(pet)
  }
}
