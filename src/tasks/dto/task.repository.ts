import { DataSource, Repository } from 'typeorm';
import { Task } from '../task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../task.-status.enuml';
import { GetTasksFilterDto } from './get-tasks-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private datasource: DataSource) {
    super(Task, datasource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const { status, search } = filterDto;
    if (status) query.andWhere('task.status = :status', { status });

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
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
