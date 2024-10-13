import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DigitalOceanModule } from './digitalocean/digitalocean.module';

@Module({
  imports: [DigitalOceanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
