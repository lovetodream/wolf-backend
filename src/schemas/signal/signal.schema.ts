import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { App } from '../app.schema';
import { Payload } from './payload.schema';

export type SignalDocument = Signal & Document;

@Schema({ timestamps: true, strict: false })
@ObjectType()
export class Signal {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'App' })
  @Field(() => App)
  app: App;

  @Prop()
  @Field(() => String)
  type: string;

  @Prop()
  @Field(() => String, { nullable: true })
  userID?: string;

  @Prop()
  @Field(() => Payload)
  payload: Payload;

  @Prop({
    default: () => new Date(),
  })
  @Field(() => Date)
  receivedAt: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
