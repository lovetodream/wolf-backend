import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/schemas/user.schema';
import { AuthService, Users } from './auth.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Users)
  users() {
    return this.authService.users();
  }

  @Mutation(() => User)
  createAccount(@Args() dto: CreateAccountDto) {
    return this.authService.create(dto);
  }
}
