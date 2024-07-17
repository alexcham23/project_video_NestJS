import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuardGuard implements CanActivate {
  constructor(private readonly reflector:Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //const user = context.switchToHttp().getRequest().user;
    const user = context.getArgByIndex(0).user.user;
    const roles = user.roles;

    const rol = this.reflector.get<string[]>('rol',context.getHandler());
   
    const isAllow = roles.some((rolUser) => rol.includes(rolUser));
    return isAllow;
  }
}
