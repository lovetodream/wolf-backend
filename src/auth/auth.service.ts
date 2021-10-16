import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async users(): Promise<Users> {
    return {
      totalCount: await this.userModel.count(),
    };
  }
}

@ObjectType()
export class Users {
  @Field()
  totalCount: number;
}
