import { PartialType } from '@nestjs/mapped-types';
import { CreatePomodoroDto } from './create-pomodoro.dto';
import { IsNotEmpty, IsDate, IsNumber, IsMongoId} from 'class-validator';

export class UpdatePomodoroDto extends PartialType(CreatePomodoroDto) {

    @IsNotEmpty()
    @IsMongoId()
    taskId?: string;

    @IsNotEmpty()
    @IsNumber()
    duration?: number;

    @IsNotEmpty()
    @IsNumber()
    breakDuration: number;

    @IsNotEmpty()
    @IsDate()
    startTime?: Date;
}
