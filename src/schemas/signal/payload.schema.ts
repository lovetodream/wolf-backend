import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { AppType, appTypeValues } from '../app.schema';

@Schema({ strict: false })
@ObjectType()
export class Payload {
  @Prop({ type: AppType, enum: appTypeValues, required: false })
  @Field(() => AppType, { nullable: true })
  platform?: AppType;

  @Prop()
  @Field(() => Boolean, { nullable: true })
  isProduction?: boolean;

  @Prop()
  @Field(() => Boolean, { nullable: true })
  isTesting?: boolean;

  @Prop()
  @Field(() => Boolean, { nullable: true })
  isSimulator?: boolean;

  @Prop()
  @Field(() => String, { nullable: true })
  targetEnvironment?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  appVersion?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  build?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  modelName?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  operatingSystem?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  osVersion?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  architecture?: string;
}
