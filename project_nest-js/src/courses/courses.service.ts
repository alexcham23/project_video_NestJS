import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './model/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private readonly courseModel:Model<CourseDocument>) 
  {}

  create(createCourseDto: CreateCourseDto) {
    return this.courseModel.create(createCourseDto);
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
