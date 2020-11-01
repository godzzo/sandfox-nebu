import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sffc-form-checkbox',
  styleUrls: ['./form-checkbox.component.scss'],
  templateUrl: './form-checkbox.component.html',
})
export class FormCheckboxComponent {
  @Input() label = 'Választható opció';
  @Input() name = 'Simple';
  @Input() formGroup: FormGroup;
}
