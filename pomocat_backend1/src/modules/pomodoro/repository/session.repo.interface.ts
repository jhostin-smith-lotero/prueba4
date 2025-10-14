import { UpdateQuery } from "mongoose";
import { PomodoroSession, PomodoroSessionDocument } from "../schemas/pomodoro.schema";

export const POMODORO_SESSION_REPO = Symbol("POMODORO_SESSION_REPO");

export interface IPomodoroSessionRepository {
  ensureExists(userId: string): Promise<PomodoroSessionDocument>;
  create(dto: Partial<PomodoroSession>, userId: string, taskId: string): Promise<PomodoroSessionDocument>;
  completePomodoro(id: string): Promise<PomodoroSessionDocument | null>;
  findAll(): Promise<PomodoroSessionDocument[]>;
  findAllByUser(userId: string): Promise<PomodoroSessionDocument[]>;
  findOne(id: string): Promise<PomodoroSessionDocument | null>;
  update(id: string, dto: UpdateQuery<PomodoroSessionDocument>): Promise<PomodoroSessionDocument | null>;
  delete(id: string): Promise<PomodoroSessionDocument | null>;
}