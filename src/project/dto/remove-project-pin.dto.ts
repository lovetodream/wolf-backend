import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNumber, MaxLength } from 'class-validator';

@ArgsType()
export class RemoveProjectPinDto {
  @IsMongoId()
  @Field()
  @Field()
  id: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @MaxLength(4)
  @Field()
  currentPin: number;
}
