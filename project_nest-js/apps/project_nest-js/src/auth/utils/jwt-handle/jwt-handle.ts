import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHandle {
    constructor(private JwtService: JwtService){}

    /**
     * 
     * @param token jwt
     * @returns 
     */
    
    public getIdByToken(token: string){
        const response = this.JwtService.verify(token);
        return response;
    }
}
