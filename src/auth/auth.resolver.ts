import { Query, Resolver } from '@nestjs/graphql';
import { AuthService, Users } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Users)
  users() {
    return this.authService.users();
  }
}
