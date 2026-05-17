import { IsString, IsInt } from 'class-validator';

export class CreatePetDto {
    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsString()
    species: string;

}
