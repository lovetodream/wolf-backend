import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@ArgsType()
export class SignInDto {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @Field()
  password: string;
}
