import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class CreateProjectDto {
  @IsString()
  @Field()
  name: string;
}
