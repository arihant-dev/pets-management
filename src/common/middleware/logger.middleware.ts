import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    console.log('[PetsAPI]', req.method, req.baseUrl, 'at', new Date().toLocaleTimeString())
    next();
  }
}
