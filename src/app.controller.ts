import { Controller, Get, Head, Req, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { FastifyRequest, FastifyReply } from 'fastify'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  version(@Res() rep: FastifyReply) {
    rep
      .code(200)
      .header('x-api-version', this.appService.version())
      .send(this.appService.version())
  }
}
