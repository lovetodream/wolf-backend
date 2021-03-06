import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { App, AppSchema } from 'src/schemas/app.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: App.name, schema: AppSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
