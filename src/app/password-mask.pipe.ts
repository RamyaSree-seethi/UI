import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordMask'
})
export class PasswordMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Mask the password with asterisks (*)
    return '*'.repeat(value.length);
  }
}
