import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreInfrastructureModule } from './core/infrastructure/core-infrastructure.module';
import { MessagesModule } from './modules/messages/messages.module';
import { UsersModule } from './modules/users/user.module';
import { ToolsModule } from './modules/tools/tools.module';

@Module({
  imports: [CoreInfrastructureModule, MessagesModule, UsersModule, ToolsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
