import { BadRequestException, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { POMODORO_SESSION_REPO, type IPomodoroSessionRepository } from '../repository/session.repo.interface';


@Injectable()
export class PomodoroService {

  constructor(@Inject(POMODORO_SESSION_REPO) private readonly repo: IPomodoroSessionRepository) {}

  async create(dto: Partial<any>, userId: string, taskId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    if (!taskId) {
      throw new BadRequestException('Task ID is required');
    }
    return this.repo.create(dto, userId, taskId);
  }

  async findAll() {
    return this.repo.findAll();
  }


  async findAllByUser(userId: string) {
    return this.repo.findAllByUser(userId);
  }

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, dto: Partial<any>) {
    return this.repo.update(id, dto);
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }

  async complete(id: string) {
    return this.repo.completePomodoro(id);
  }
}
