import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@ArgsType()
export class DeleteAppDto {
  @IsMongoId()
  @Field()
  projectId: string;

  @IsMongoId()
  @Field()
  appId: string;
}
