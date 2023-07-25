import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.-status.enuml';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
