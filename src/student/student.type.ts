import { Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType('Student')
export class StudentType {
    @Field(_ => ID )
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;
}