import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { App, AppDocument } from 'src/schemas/app.schema';
import { CreateAppDto } from './dto/createAppDto';

@Injectable()
export class AppService {
  constructor(@InjectModel(App.name) private appModel: Model<AppDocument>) {}

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
}
