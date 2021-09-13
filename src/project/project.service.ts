import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async findAll(): Promise<ProjectDocument[]> {
    return this.projectModel.find();
  }

  async findOne(id: string): Promise<ProjectDocument> {
    return this.projectModel.findById(id);
  }

  async create(dto: CreateProjectDto): Promise<ProjectDocument> {
    const project = new Project();
    project.name = dto.name;
    return this.projectModel.create(project);
  }
}
