import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseFilters } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { StaffGuardGuard } from 'src/common/guards/staff-guard.guard';
import { AgeValidationPipe } from 'src/common/pipes/age-validation.pipe';
import { SpeciesTransformPipe } from 'src/common/pipes/species-transform.pipe';
import { PetNotFoundFilter } from 'src/common/filters/pet-not-found.filter';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @UseGuards(StaffGuardGuard)
  create(
    @Body('age', AgeValidationPipe) age: number,
    @Body('species', SpeciesTransformPipe) species: string,
    @Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Get()
  findAll(@Query('age') age: number, @Query('name') name: string, @Query('species') species: string) {
    
    return this.petsService.findAll();
  }

  @Get(':id')
  @UseFilters(PetNotFoundFilter)
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @Patch(':id')
  @UseFilters(PetNotFoundFilter)
  @UseGuards(StaffGuardGuard)
  update(
        @Param('id') id: string, 
        @Body('age', AgeValidationPipe) age: number, 
        @Body('species', SpeciesTransformPipe) species: string, 
        @Body() updatePetDto: UpdatePetDto
      ) {
    return this.petsService.update(+id, updatePetDto);
  }

  @Delete(':id')
  @UseFilters(PetNotFoundFilter)
  @UseGuards(StaffGuardGuard)
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}
