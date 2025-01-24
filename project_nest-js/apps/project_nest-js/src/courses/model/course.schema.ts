import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  idAuthor: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  cover: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.statics.findAllCourses = function () {
  const list = this.aggregate([
    {
      $lookup: {
        from: 'users',
        as: 'author',
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$id', '$$authorId'],
              },
            },
          },
          {
            $project: {
              _id: 0,
              name: 1,
              email: 1,
              avatar: 1,
            },
          },
        ],
        let: { authorId: '$idAuthor' },
      },
    },
    {
      $unwind: '$author',
    },
  ]);

  return list;
};
