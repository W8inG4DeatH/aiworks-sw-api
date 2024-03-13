// translate.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { GoogleCloudTranslationService } from './google-cloud-translation.service';

@Controller('translate')
export class GoogleCloudTranslationController {
  constructor(
    private readonly googleCloudTranslationService: GoogleCloudTranslationService,
  ) {}

  @Post()
  async translate(@Body() body: { text: any; targetLanguage: string }) {
    const { text, targetLanguage } = body;
    return this.googleCloudTranslationService.translateTextRecursively(
      text,
      targetLanguage,
    );
  }
}
