import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from './project.schema';

export type AppDocument = App & Document;

export enum AppType {
  WEB,
  IOS,
  ANDROID,
  OTHER,
}

registerEnumType(AppType, {
  name: 'AppType',
});

export const appTypeValues = Object.values(AppType);

@Schema({ timestamps: true })
@ObjectType()
export class App {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ enum: appTypeValues, required: true })
  @Field(() => AppType)
  type: AppType;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Project' }] })
  @Field(() => Project)
  project: Project;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const AppSchema = SchemaFactory.createForClass(App);
