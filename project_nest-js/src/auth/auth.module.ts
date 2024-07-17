import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../user/model/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' }
        }
      },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,schema: UserSchema
      }
  ])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})

export class AuthModule {}
