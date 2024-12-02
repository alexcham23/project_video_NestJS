import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PaginationV2Middleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    /**
     * Queryparams
     * limit = 10
     * page = 2
     */
    const { limit = '5', page = '1' } = req.query;
    req.paginate = { limit, page };
    next();
  }
}

interface RequestPaginatev2 extends Request {
  paginate?: {
    limit: any;
    page: any;
  };
}
