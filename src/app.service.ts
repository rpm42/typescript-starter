import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  version(): string {
    return 'dpmapi-v0.0.1'
  }
}
