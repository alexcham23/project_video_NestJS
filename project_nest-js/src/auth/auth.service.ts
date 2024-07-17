import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/model/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    public async register(userBody:RegisterAuthDto) {
        const {password,...user}=userBody;
        const userParse={...user,password:await generateHash(password)};
        return this.userModel.create(userParse);
    }

    public async login(userLoginBody: LoginAuthDto) {
        const userExist= await this.userModel.findOne({email:userLoginBody.email});
        if(!userExist) throw new HttpException('NOT_FOUND',HttpStatus.NOT_FOUND);

        const isCheck=await compareHash(userLoginBody.password,userExist.password);
        if(!isCheck) throw new HttpException('PASSWORD_INVALID',HttpStatus.UNAUTHORIZED);
        const userFlat=userExist.toObject();
        delete userFlat.password;

        const payload={
            id:userFlat._id,
        }

        const token=await this.jwtService.sign(payload);
        const data={
            token,
            user:userFlat
        }

        return data;
    }
}
