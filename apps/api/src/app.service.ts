import { Injectable } from '@nestjs/common';
import type { ApiHealthResponse } from '@workspace/shared';

@Injectable()
export class AppService {
  getHello(): ApiHealthResponse {
    return {
      status: 'ok',
      message: 'Hello World!',
    };
  }
}
