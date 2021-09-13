import { AppType } from '@wolf/schemas';

export class CreateAppDto {
  projectId: string;

  type: AppType;
}
