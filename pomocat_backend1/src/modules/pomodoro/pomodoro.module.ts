import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PomodoroSession, PomodoroSessionSchema } from './schemas/pomodoro.schema';
import { PomodoroController } from './controllers/pomodoro.controller';
import { PomodoroService } from './services/pomodoro.service';
import { POMODORO_SESSION_REPO } from './repository/session.repo.interface';
import { PomodoroSessionRepository } from './repository/session.repo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PomodoroSession.name, schema: PomodoroSessionSchema }]),
  ],
  controllers: [PomodoroController],
  providers: [PomodoroService,
    { provide: POMODORO_SESSION_REPO, useClass: PomodoroSessionRepository },
  ],
  exports: [PomodoroService,
    { provide: POMODORO_SESSION_REPO, useClass: PomodoroSessionRepository }
  ],
})
export class PomodoroModule {}
