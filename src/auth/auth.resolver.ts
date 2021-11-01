import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
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
  createAccount(@Args() dto: CreateAccountDto, @Context() context: GqlContext) {
    return this.authService.create(dto, context);
  }

  @Mutation(() => User)
  signIn(@Args() dto: SignInDto, @Context() context: GqlContext) {
    return this.authService.signIn(dto, context);
  }
}

export interface GqlContext {
  req: Request;
  res: Response;
}
