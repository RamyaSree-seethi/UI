import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage = 'en'; // Default language

  constructor(private http: HttpClient) {}

  setSelectedLanguage(language: string): void {
    this.currentLanguage = language;
  }

  getTranslations(): Observable<any> {
    return this.http.get<any>(`/assets/i18n/${this.currentLanguage}.json`);
  }
}
