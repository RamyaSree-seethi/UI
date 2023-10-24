import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private selectedLanguageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('en');
  selectedLanguage$: Observable<string> = this.selectedLanguageSubject.asObservable();

  constructor() {}

  // Getter for selected language
  getSelectedLanguage(): string {
    return this.selectedLanguageSubject.value;
  }

  // Setter for selected language
  setSelectedLanguage(language: string): void {
    this.selectedLanguageSubject.next(language);
  }
}
