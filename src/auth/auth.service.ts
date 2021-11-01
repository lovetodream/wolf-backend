import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { GqlContext } from './auth.resolver';
import { CreateAccountDto } from './dto/create-account.dto';
import { SignInDto } from './dto/sign-in.dto';

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

  async create(dto: CreateAccountDto, context: GqlContext): Promise<User> {
    const user = new User();
    user.email = dto.email;
    user.admin = (await this.userModel.count()) === 0;
    user.password = await hash(dto.password, 10);

    const savedUser = await this.userModel.create(user);

    const token = this.jwtService.sign(
      {
        sub: savedUser._id,
        email: savedUser.email,
      },
      { expiresIn: '2h' },
    );

    context.req.res.cookie('Authorization', `Bearer ${token}`, {
      maxAge: 100 * 60 * 120,
      signed: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      domain: process.env.DOMAIN ?? 'localhost',
      sameSite: true,
    });

    return savedUser;
  }

  async signIn(dto: SignInDto, context: GqlContext): Promise<User> {
    const user = await this.userModel.findOne({ email: dto.email });

    if (
      !(await compare(
        dto.password,
        user.get('password', null, { getters: false }),
      ))
    ) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign(
      { sub: user._id, email: user.email },
      { expiresIn: '2h' },
    );

    context.req.res.cookie('Authorization', `Bearer ${token}`, {
      maxAge: 100 * 60 * 120,
      signed: true,
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    return user;
  }
}

@ObjectType()
export class Users {
  @Field()
  totalCount: number;
}
