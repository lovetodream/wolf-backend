import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

@ArgsType()
export class UpdateGeneralProjectDto {
  @IsMongoId()
  @Field()
  id: string;

  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  @Field({ nullable: true })
  bio?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  alias?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsUrl()
  @Field({ nullable: true })
  url?: string;
}
