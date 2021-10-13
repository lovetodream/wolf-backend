import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteResult } from 'src/helper/delete-result';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { ArchiveProjectDto } from './dto/archive-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteProjectDto } from './dto/delete-project.dto';
import { UpdateGeneralProjectDto } from './dto/update-general-project.dto';

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

  async pingOne(id: string): Promise<boolean> {
    const documentCount = await this.projectModel.countDocuments({ _id: id });

    if (documentCount === 0) {
      throw new NotFoundException();
    } else if (documentCount > 1) {
      throw new ConflictException(
        null,
        `More than one (${documentCount}) projects with same id found`,
      );
    }

    return !!documentCount;
  }

  async create(dto: CreateProjectDto): Promise<ProjectDocument> {
    const project = new Project();
    project.name = dto.name;
    return this.projectModel.create(project);
  }

  async updateGeneral(dto: UpdateGeneralProjectDto): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(dto.id);
    project.name = dto.name;
    project.bio = dto.bio;
    project.alias = dto.alias;
    project.description = dto.description;
    project.alias = dto.alias;
    return project.save();
  }

  async archive(dto: ArchiveProjectDto): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(dto.id);
    project.archived = true;
    return project.save();
  }

  async delete(dto: DeleteProjectDto): Promise<DeleteResult> {
    return this.projectModel.deleteOne({ _id: dto.id });
  }
}
