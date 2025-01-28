import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Video } from './model/video.schema';
import { Model } from 'mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('VideosService', () => {
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [
        {
          provide: getModelToken(Video.name),
          useValue: Model,
        },
        VideosService,
      ],
    }).compile();

    service = module.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
