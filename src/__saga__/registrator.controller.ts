import { Body, Controller, Post } from '@nestjs/common';
import { RegistatorService } from './registrator.service';
import { DomainMessage } from 'src/__lib__/domain-message';
import { config } from 'src/config';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Cron } from '@nestjs/schedule';

export class CreateSagaDto {
  correlationId: string;
}

@Controller('/saga')
export class RegistatorController {
  constructor(private readonly registatorService: RegistatorService) {}

  @RabbitSubscribe({
    exchange: config().rabbitmq.exchange,
    routingKey: config().topics.sagaReceived,
    queue: config().topics.sagaReceived,
  })
  async applySagaReceived(event: DomainMessage): Promise<void> {
    await this.registatorService.createStepForSaga(event);
  }

  @Post('/')
  async createSaga(@Body() payload: CreateSagaDto) {
    return this.registatorService.createSaga(payload.correlationId);
  }

  @Cron('* * * * *')
  async timeOut() {
    await this.registatorService.checkSagaTimeout();
  }
}
