import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SandfoxNebuFormControlsService {
  constructor() {}

  getControlStatus(control: AbstractControl) {
    return !control.valid ? 'danger' : 'basic';
  }
}
