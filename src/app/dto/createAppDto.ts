import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { AppType } from '../../schemas/app.schema';

@ArgsType()
export class CreateAppDto {
  @IsMongoId()
  @Field()
  projectId: string;

  @Field(() => AppType)
  type: AppType;
}
