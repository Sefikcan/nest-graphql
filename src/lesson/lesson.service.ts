import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ) {}

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        });

        return await this.lessonRepository.save(lesson);
    }

    async getLesson(id: string): Promise<Lesson> {
        return await this.lessonRepository.findOne({id});
    }

    async getLessons(): Promise<Lesson[]> {
        return await this.lessonRepository.find();
    }

    async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentsToLessonInput): Promise<Lesson> {
        const { lessonId, studentIds } = assignStudentsToLessonInput;
        const lesson = await this.lessonRepository.findOne({ id: lessonId });
        lesson.students = [...lesson.students, ...studentIds];
        return this.lessonRepository.save(lesson);
    }
}
