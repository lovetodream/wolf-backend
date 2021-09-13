import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Project } from 'src/schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';

@Resolver()
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query(() => Project)
  async project(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Mutation(() => Project)
  async createProject(@Args() args: CreateProjectDto): Promise<Project> {
    return this.projectService.create(args);
  }
}
