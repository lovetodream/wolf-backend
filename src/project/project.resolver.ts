import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { DeleteResult } from 'src/helper/delete-result';
import { Project } from 'src/schemas/project.schema';
import { ArchiveProjectDto } from './dto/archive-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteProjectDto } from './dto/delete-project.dto';
import { ResetProjectAvatarDto } from './dto/reset-project-avatar.dto';
import { UpdateGeneralProjectDto } from './dto/update-general-project.dto';
import { UpdateProjectAvatarDto } from './dto/update-project-avatar.dto';
import { UpdateProjectSecuritySettingsDto } from './dto/update-project-security-settings.dto';
import { ProjectService } from './project.service';

@UseGuards(GqlAuthGuard)
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

  @Mutation(() => Project)
  async updateGeneralProjectInfo(
    @Args() args: UpdateGeneralProjectDto,
  ): Promise<Project> {
    return this.projectService.updateGeneral(args);
  }

  @Mutation(() => Project)
  async updateProjectAvatar(
    @Args() args: UpdateProjectAvatarDto,
  ): Promise<Project> {
    return this.projectService.updateAvatar(args);
  }

  @Mutation(() => Project)
  async resetProjectAvatar(
    @Args() args: ResetProjectAvatarDto,
  ): Promise<Project> {
    return this.projectService.resetAvatar(args);
  }

  // Security features

  @Mutation(() => Project)
  async updateProjectSecuritySettings(
    @Args() args: UpdateProjectSecuritySettingsDto,
  ): Promise<Project> {
    return this.projectService.updateSecuritySettings(args);
  }

  @Mutation(() => Project)
  async archiveProject(@Args() args: ArchiveProjectDto): Promise<Project> {
    return this.projectService.archive(args);
  }

  @Mutation(() => DeleteResult)
  async deleteProject(@Args() args: DeleteProjectDto): Promise<DeleteResult> {
    return this.projectService.delete(args);
  }
}
