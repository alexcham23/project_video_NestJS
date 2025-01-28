import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './model/course.schema';
import { User } from '../user/model/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('CoursesController', () => {
  let controller: CoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      controllers: [CoursesController],
      providers: [
        {
          provide: getModelToken(Course.name),
          useValue: Model,
        },
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: {},
        },
        CoursesService,
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
