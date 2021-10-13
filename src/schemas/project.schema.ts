import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { App } from './app.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Project {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  archived: boolean;

  @Prop()
  @Field()
  softDeleted: boolean;

  @Prop({ unique: true })
  @Field({ nullable: true })
  alias?: string;

  @Prop()
  @Field({ nullable: true })
  url?: string;

  @Prop()
  @Field({ nullable: true })
  bio?: string;

  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop()
  @Field({ nullable: true })
  avatar?: string;

  // MARK: Security features

  @Prop()
  @Field({ nullable: true })
  pin?: string;

  @Prop()
  @Field({ nullable: true })
  recoveryEmail?: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'App' }] })
  @Field(() => [App])
  app: App[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
