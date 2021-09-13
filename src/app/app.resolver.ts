import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { App } from 'src/schemas/app.schema';
import { CreateAppDto } from './dto/createAppDto';

@Resolver()
export class AppResolver {
  constructor(private appService: AppService) {}

  @Query(() => App)
  async app(@Args('id', { type: () => String }) id: string): Promise<App> {
    return this.appService.findOne(id);
  }

  @Mutation(() => App)
  async createApp(@Args() args: CreateAppDto): Promise<App> {
    return this.appService.create(args);
  }
}
