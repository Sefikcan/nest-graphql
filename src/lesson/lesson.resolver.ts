import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(_ => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ){}

    @Query(_ => LessonType)
    lesson(
        @Args('id') id: string
    ) {
        return this.lessonService.getLesson(id);
    }
    
    @Query(_ => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(_ => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput
    ) {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(_ => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput
    ) {
        return this.lessonService.assignStudentsToLesson(assignStudentsToLessonInput);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);;
    }
}