import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoogleCloudTranslationService } from './google-cloud-translation.service';
import { GoogleCloudTranslationController } from './google-cloud-translation.controller';

@Module({
  imports: [HttpModule],
  controllers: [GoogleCloudTranslationController],
  providers: [GoogleCloudTranslationService],
})
export class GoogleCloudTranslationModule {}
