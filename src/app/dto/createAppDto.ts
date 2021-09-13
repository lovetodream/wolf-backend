import { ArgsType, Field } from '@nestjs/graphql';
import { AppType } from '../../schemas/app.schema';

@ArgsType()
export class CreateAppDto {
  @Field()
  projectId: string;

  @Field(() => AppType)
  type: AppType;
}
