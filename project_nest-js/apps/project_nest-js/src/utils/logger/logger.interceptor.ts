import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //console.log('Before...', context['contextType']);
    //console.log('Before...',Object.keys(context));
    //console.log('Before...',Object.keys(context.getArgs()));
    //console.log('Before...',context.getArgs()[0]);
    const [req] = context.getArgs();
    console.log('Before...', req.params);
    return next
      .handle()
      .pipe(tap((value) => console.log('respuesta.....', value)));
  }
}
