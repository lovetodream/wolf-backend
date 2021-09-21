import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@ArgsType()
export class DeleteProjectDto {
  @IsMongoId()
  @Field()
  id: string;
}
