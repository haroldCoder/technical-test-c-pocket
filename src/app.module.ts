import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreInfrastructureModule } from './core/infrastructure/core-infrastructure.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [CoreInfrastructureModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
