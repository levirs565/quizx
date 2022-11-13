import { SetMetadata } from '@nestjs/common';

export const MetadataValidationGroups = 'SkipCustomValidationPipe';

export function ValidationGroups(groups: string[]) {
  return SetMetadata(MetadataValidationGroups, groups);
}
