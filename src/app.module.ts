import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true // save schema in memory and regenerated from every started the nestjs application
    }),
    LessonModule
  ]
})
export class AppModule {}
