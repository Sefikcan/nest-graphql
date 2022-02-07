import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentInput } from "./create-student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(_ => StudentType)
export class StudentResolver {
    constructor(
        private studentService: StudentService
    ){}

    @Mutation(_ => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput
    ) {
        return this.studentService.createStudent(createStudentInput);
    }

    @Query(_ => [StudentType])
    students() {
        return this.studentService.getStudents();
    }

    @Query(_ => StudentType)
    student(
        @Args('id') id: string
    ) {
        return this.studentService.getStudent(id);
    }
}