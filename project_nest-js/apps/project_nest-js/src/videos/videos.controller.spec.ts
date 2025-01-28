import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { getModelToken } from '@nestjs/mongoose';
import { Video } from './model/video.schema';
import { Model } from 'mongoose';

describe('VideosController', () => {
  let controller: VideosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      controllers: [VideosController],
      providers: [
        {
          provide: getModelToken(Video.name),
          useValue: Model,
        },
        VideosService,
      ],
    }).compile();

    controller = module.get<VideosController>(VideosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
