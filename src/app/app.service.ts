import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteResult } from 'src/helper/delete-result';
import { App, AppDocument } from 'src/schemas/app.schema';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { CreateAppDto } from './dto/createAppDto';
import { DeleteAppDto } from './dto/deleteAppDto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(App.name) private appModel: Model<AppDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async findOne(id: string): Promise<AppDocument> {
    return this.appModel.findById(id);
  }

  async create(createAppDto: CreateAppDto): Promise<App> {
    const app = await this.appModel.create({
      type: createAppDto.type,
      project: createAppDto.projectId,
    });
    return app.save();
  }

  async delete(deleteAppDto: DeleteAppDto): Promise<DeleteResult> {
    const project = await this.projectModel.findById(deleteAppDto.projectId);

    if (!project) {
      throw new NotFoundException();
    }

    return this.appModel.deleteOne({ id: deleteAppDto.appId, project });
  }
}
