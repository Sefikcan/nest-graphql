import { Field, InputType, ID } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssignStudentsToLessonInput {
    @IsUUID("4", { each:true }) //uuid version, validation options
    @Field(_ => [ID])
    studentIds: string[];

    @IsUUID()
    @Field(_=> ID)
    lessonId: string;
}