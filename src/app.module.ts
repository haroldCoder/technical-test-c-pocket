import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreInfrastructureModule } from './core/infrastructure/core-infrastructure.module';

@Module({
  imports: [CoreInfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
