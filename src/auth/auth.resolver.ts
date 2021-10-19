import { Res } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { User } from 'src/schemas/user.schema';
import { AuthService, Users } from './auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { SignInDto } from './dto/sign-in.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Users)
  users() {
    return this.authService.users();
  }

  @Mutation(() => User)
  createAccount(@Args() dto: CreateAccountDto, @Res() res: Response) {
    return this.authService.create(dto, res);
  }

  @Mutation(() => User)
  signIn(@Args() dto: SignInDto, @Res() res: Response) {
    return this.authService.signIn(dto, res);
  }
}
