import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AgeValidationPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (value >= 0 && value < 30){
      return value;
    } else {
      throw new BadRequestException('Validation failed - Age should be between 0-30'); 
    }
  }
}
