import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private location: Location) {}
  private navigationStack: string[] = [];

  pushToStack(route: string): void {
    this.navigationStack.push(route);
  }

  popFromStack(): string | undefined {
    return this.navigationStack.pop();
  }

  getPreviousRoute(): string | undefined {
    const stackLength = this.navigationStack.length;
    if (stackLength >= 2) {
      // Return the previous route without popping it from the stack
      return this.navigationStack[stackLength - 2];
    }
    return undefined;
  }
}
