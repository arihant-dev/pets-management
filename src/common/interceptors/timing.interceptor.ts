import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
    const now = Date.now();
    return next
      .handle()
      .pipe(
        map((data) => ({...data, duration:Date.now() - now+'ms'})),
      );
  }
}
