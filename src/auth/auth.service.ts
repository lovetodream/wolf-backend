import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async users(): Promise<Users> {
    return {
      totalCount: await this.userModel.count(),
    };
  }

  async create(dto: CreateAccountDto, res: Response): Promise<User> {
    const user = new User();
    user.email = dto.email;
    user.admin = (await this.userModel.count()) === 0;
    user.password = hashSync(dto.password, 10);

    const savedUser = await this.userModel.create(user);

    const token = this.jwtService.sign(
      {
        sub: savedUser._id,
        email: savedUser.email,
      },
      { expiresIn: '2h' },
    );

    res.cookie('Authorization', `Bearer ${token}`, {
      maxAge: 100 * 60 * 120,
      signed: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      domain: process.env.DOMAIN ?? 'localhost',
      sameSite: true,
    });

    return savedUser;
  }
  }
}

@ObjectType()
export class Users {
  @Field()
  totalCount: number;
}
