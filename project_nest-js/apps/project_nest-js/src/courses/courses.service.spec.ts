import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getModelToken } from '@nestjs/mongoose';
import { Course } from './model/course.schema';
import { Model } from 'mongoose';
import { User } from '../user/model/user.schema';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Course.name),
          useValue: Model,
        },
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
        CoursesService,
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
