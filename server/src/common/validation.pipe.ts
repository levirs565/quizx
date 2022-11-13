import { ArgumentMetadata, ValidationPipe as OriginalValidationPipe } from '@nestjs/common';
import { MetadataValidationGroups } from '@quizx/shared';

// Adapted from https://github.com/nestjs/nest/issues/2390#issuecomment-517623971
export class ValidationPipe extends OriginalValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const originalGroups = this.validatorOptions.groups;
    if (metadata.metatype) {
      const groups = Reflect.getMetadata(MetadataValidationGroups, metadata.metatype);
      if (groups) {
        this.validatorOptions.groups = groups;
      }
    }

    const result = super.transform(value, metadata);
    this.validatorOptions.groups = originalGroups;
    return result;
  }
}
