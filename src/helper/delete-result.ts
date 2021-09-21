import { Field, ObjectType } from '@nestjs/graphql';
import { DeleteResult as IDeleteResult } from 'mongodb';

@ObjectType()
export class DeleteResult implements IDeleteResult {
  @Field()
  acknowledged: boolean;

  @Field()
  deletedCount: number;
}
