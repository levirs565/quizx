export const MetadataValidationGroups = "SkipCustomValidationPipe";

export function ValidationGroups(groups: string[]): ClassDecorator {
  return (target: Object) => {
    Reflect.defineMetadata(MetadataValidationGroups, groups, target);
  };
}
