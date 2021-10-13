import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNumber, MaxLength } from 'class-validator';

@ArgsType()
export class UpdateProjectPinDto {
  @IsMongoId()
  @Field()
  id: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @MaxLength(4)
  @Field({ nullable: true })
  previousPin?: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @MaxLength(4)
  @Field()
  pin: number;
}
