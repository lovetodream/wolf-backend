import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateAccountDto } from './dto/create-account.dto';

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

  async create(dto: CreateAccountDto): Promise<User> {
    const user = new User();
    user.email = dto.email;
    user.admin = (await this.userModel.count()) === 0;
    user.password = hashSync(dto.password, 10);
    return this.userModel.create(user);
  }
}

@ObjectType()
export class Users {
  @Field()
  totalCount: number;
}
