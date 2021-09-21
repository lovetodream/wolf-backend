import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@ArgsType()
export class ArchiveProjectDto {
  @IsMongoId()
  @Field()
  id: string;
}
