import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class GoogleCloudTranslationService {
  private apiKey = '/google-api.key';
  private apiUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpService) {}

  async translateTextRecursively(
    obj: any,
    targetLanguage: string,
  ): Promise<any> {
    if (typeof obj === 'string') {
      return await this.translateText(obj, targetLanguage);
    } else if (Array.isArray(obj)) {
      return await Promise.all(
        obj.map((item) => this.translateTextRecursively(item, targetLanguage)),
      );
    } else if (typeof obj === 'object' && obj !== null) {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = await this.translateTextRecursively(
          value,
          targetLanguage,
        );
      }
      return result;
    } else {
      return obj; // Niezmienione dla typów innych niż string, array, object
    }
  }

  private async translateText(
    text: string,
    targetLanguage: string,
  ): Promise<string> {
    const body = {
      q: text,
      target: targetLanguage,
      format: 'text',
    };
    const headersRequest = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return this.http
      .post(`${this.apiUrl}?key=${this.apiKey}`, body, {
        headers: headersRequest,
      })
      .pipe(
        map((response) => response.data.data.translations[0].translatedText),
      )
      .toPromise();
  }
}
