import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/model/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly eventEmitter:EventEmitter2,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}
    /**
     * Metodo para registrar un usuario
     * @param userBody 
     * @returns 
     */
    public async register(userBody:RegisterAuthDto) {
        const {password,...user}=userBody;
        const userParse={...user,password:await generateHash(password)};
        const newUser=await this.userModel.create(userParse);
        /**
         * Emitir evento para enviar correo de bienvenida
         */
        this.eventEmitter.emit('user.created', newUser);
        return newUser;

    }
    /**
     * Metodo para iniciar sesion
     * @param userLoginBody 
     * @returns 
     */
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
        /**
         * Emitir evento para enviar correo de bienvenida
         */
        this.eventEmitter.emit('user.login', data);
        return data;
    }
}
