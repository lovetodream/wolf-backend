import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@ArgsType()
export class ResetProjectAvatarDto {
  @IsMongoId()
  @Field()
  id: string;
}
