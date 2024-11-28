import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './model/course.schema';
import { User, UserDocument } from '../user/model/user.schema';
import { Model, Types } from 'mongoose';

interface ModelExt<T> extends Model<T>{
  delete:Function;
  findAllCourses:Function;
}

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel:ModelExt<CourseDocument>,
    @InjectModel(User.name) private readonly userModel:ModelExt<UserDocument>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    return this.courseModel.create(createCourseDto);
  }

  async findAll() {
    //const listCourses = await this.courseModel.find({});
    //return listCourses;
    return this.courseModel.findAllCourses();
  }

  async findOne(id: string) {
    return this.courseModel.findOne({ id });
  }

  async update(id: string, body: UpdateCourseDto) {
    return this.courseModel.findOneAndUpdate({id}, body,{
      upsert:true, //Si no existe, lo crea
      new:true, //Devuelve el objeto actualizado
    });
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id);
    const response = this.courseModel.delete({ _id });
    return response;
  }
}
