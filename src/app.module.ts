import { Module, OnModuleInit } from '@nestjs/common';
import 'dotenv/config';
import { EventsModule } from './events/events.module';
@Module({
  imports: [EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    // console.log('-----------> MAIN Process: ', process.pid);
  }
}
