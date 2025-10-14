import { Injectable } from "@nestjs/common";
import type { IPomodoroSessionRepository } from "./session.repo.interface";
import { PomodoroSession, PomodoroSessionDocument } from "../schemas/pomodoro.schema";
import { Model, Types, UpdateQuery } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


@Injectable() export class PomodoroSessionRepository implements IPomodoroSessionRepository {
    constructor( @InjectModel(PomodoroSession.name) private readonly pomodoroModel: Model<PomodoroSessionDocument>, ) {}

    async ensureExists(userId: string): Promise<PomodoroSessionDocument> {
        const session = await this.pomodoroModel.findOne({ userId }).exec();
        if (!session) {
            throw new Error("Pomodoro session not found");
        }
        return session;

    }

    create(dto: Partial<PomodoroSession>, userId: string, taskId: string): Promise<PomodoroSessionDocument> {
        const doc = new this.pomodoroModel({
            ...dto,
            taskId: new Types.ObjectId(taskId),
            userId: new Types.ObjectId(userId),
        });
        return doc.save();
    }

    completePomodoro(id: string): Promise<PomodoroSessionDocument | null> {
        return this.pomodoroModel.findByIdAndUpdate(id, { completed: true, endTime: new Date() }, { new: true }).exec();
    }

    findAll(): Promise<PomodoroSessionDocument[]> {
        return this.pomodoroModel.find().exec();
    }

    findAllByUser(userId: string): Promise<PomodoroSessionDocument[]> {
        return this.pomodoroModel.find({ userId: new Types.ObjectId(userId) }).sort({ startTime: -1 }).exec();
    }

    findOne(id: string): Promise<PomodoroSessionDocument | null> {
        return this.pomodoroModel.findById(id).exec();
    }

    update(id: string, dto: UpdateQuery<PomodoroSessionDocument>): Promise<PomodoroSessionDocument | null> {
        const patch: any = { ...dto };
        return this.pomodoroModel.findByIdAndUpdate(id, patch, { new: true }).exec();
    }

    delete(id: string): Promise<PomodoroSessionDocument | null> {
        return this.pomodoroModel.findByIdAndDelete(id).exec();
    }
}