import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './model/course.schema';
import { User, UserSchema } from '../user/model/user.schema';
import { PaginationV2Middleware } from '../middleware/pagination-v2.middleware';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      //{name: Course.name ,schema: CourseSchema},
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Course.name,
        useFactory: () => {
          const schema = CourseSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationV2Middleware)
      .forRoutes({ path: 'v1/courses', method: RequestMethod.GET });
  }
}
