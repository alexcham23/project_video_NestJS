import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../user/model/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';

const clientMailServiceMock = {
  send: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      controllers: [AuthController],
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
        {
          provide: 'MAIL_SERVICE',
          useValue: clientMailServiceMock,
        },
        AuthService,
        JwtService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
