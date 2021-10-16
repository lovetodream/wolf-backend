import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@ArgsType()
export class CreateAccountDto {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @Field()
  password: string;
}
