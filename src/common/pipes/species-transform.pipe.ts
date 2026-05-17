import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SpeciesTransformPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    value.toLocaleLowerCase;
    if (value in ["dogs", "cats", "bird"]) {
      return value;
    } else {
      throw new BadRequestException('Validation failed - Species should be either Dogs, Cats or Bird'); 
    }
  }
}
