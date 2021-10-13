import { ArgsType, Field } from '@nestjs/graphql';
import { IsDataURI, IsMongoId } from 'class-validator';

@ArgsType()
export class UpdateProjectAvatarDto {
  @IsMongoId()
  @Field()
  id: string;

  @IsDataURI()
  @Field()
  avatar: string;
}
