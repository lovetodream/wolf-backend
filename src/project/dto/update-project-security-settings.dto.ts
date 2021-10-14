import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

@ArgsType()
export class UpdateProjectSecuritySettingsDto {
  @IsMongoId()
  @Field()
  id: string;

  @IsBoolean()
  @Field()
  strictMode: boolean;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  recoveryEmail?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  @MaxLength(4)
  @Field({ nullable: true })
  pin?: number;
}
