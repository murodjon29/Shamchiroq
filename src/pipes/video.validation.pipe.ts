import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { extname } from 'path';
import { handleError } from 'src/helpers/responseError';

@Injectable()
export class VideoValidationPipe implements PipeTransform {
  private readonly extensions = [
    '.mkv',
    '.mp4',
    '.avi',
    '.mov',
    '.webm',
    '.flv',
    '.wmv',
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (value) {
        const ext = extname(value.originalname).toLowerCase();
        if (!this.extensions.includes(ext)) {
          throw new BadRequestException(
            `Only allowed files ${this.extensions.join(', ')}`,
          );
        }
      }
      return value;
    } catch (error) {
      return handleError(error);
    }
  }
}
