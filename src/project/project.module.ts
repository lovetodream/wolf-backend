import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { ProjectController } from './project.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  providers: [ProjectService, ProjectResolver],
  controllers: [ProjectController],
})
export class ProjectModule {}
