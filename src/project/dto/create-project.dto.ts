import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateProjectDto {
  @Field()
  name: string;
}
