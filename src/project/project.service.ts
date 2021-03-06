import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { DeleteResult } from 'src/helper/delete-result';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { ArchiveProjectDto } from './dto/archive-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteProjectDto } from './dto/delete-project.dto';
import { ResetProjectAvatarDto } from './dto/reset-project-avatar.dto';
import { UpdateGeneralProjectDto } from './dto/update-general-project.dto';
import { UpdateProjectPinDto } from './dto/update-project-pin.dto';
import { UpdateProjectAvatarDto } from './dto/update-project-avatar.dto';
import { RemoveProjectPinDto } from './dto/remove-project-pin.dto';
import { UpdateProjectSecuritySettingsDto } from './dto/update-project-security-settings.dto';

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
    const avatar = createAvatar(style, {
      seed: dto.name,
      dataUri: true,
    });
    project.avatar = avatar;
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

  async updateAvatar(dto: UpdateProjectAvatarDto): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(dto.id);
    project.avatar = dto.avatar;
    return project.save();
  }

  async resetAvatar(dto: ResetProjectAvatarDto): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(dto.id);
    const avatar = createAvatar(style, {
      seed: project.name,
      dataUri: true,
    });
    project.avatar = avatar;
    return project.save();
  }

  // Security features
  async updateSecuritySettings(
    dto: UpdateProjectSecuritySettingsDto,
  ): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(dto.id);
    if (project.get('pin', null, { getters: false })) {
      if (!dto.pin) {
        throw new UnauthorizedException();
      }

      if (
        !(await compare(
          String(dto.pin),
          project.get('pin', null, { getters: false }),
        ))
      ) {
        throw new UnauthorizedException();
      }
    }
    project.strictMode = dto.strictMode;
    project.recoveryEmail = dto.recoveryEmail;
    return project.save();
  }

  // TODO: Pins are only cosmetic atm, they don't over any real protection on the endpoints, this needs to be worked on in the future!

  async updatePin(dto: UpdateProjectPinDto): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(dto.id);
    const pin = await hash(String(dto.pin), 10);

    if (
      !!project.get('pin') &&
      !(await compare(
        String(dto.previousPin),
        project.get('pin', null, { getters: false }),
      ))
    ) {
      throw new UnauthorizedException();
    }

    project.pin = pin;
    return project.save();
  }

  async removePin(dto: RemoveProjectPinDto): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(dto.id);

    if (!(await compare(String(dto.currentPin), project.get('pin')))) {
      throw new UnauthorizedException();
    }

    project.pin = null;
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
