import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [],
  controllers: [],
  exports: [],
  providers: [EventsGateway],
})
export class EventsModule {}
