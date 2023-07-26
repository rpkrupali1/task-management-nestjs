import { DataSource, Repository } from 'typeorm';
import { Task } from '../task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../task.-status.enuml';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private datasource: DataSource) {
    super(Task, datasource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }
}
