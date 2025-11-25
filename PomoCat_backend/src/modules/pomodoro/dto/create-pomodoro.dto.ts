import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate, IsNumber, IsMongoId} from 'class-validator';

export class CreatePomodoroDto {

    @IsNotEmpty()
    @IsNumber()
    duration: number; // In minutes

    @IsNotEmpty()
    @IsNumber()
    breakDuration: number;

    @Type(() => Date)
    @IsDate()
    startTime: Date;

    @IsMongoId()
    @IsNotEmpty()
    taskId: string;

    @IsMongoId()
    @IsNotEmpty()
    userId: string;

}
