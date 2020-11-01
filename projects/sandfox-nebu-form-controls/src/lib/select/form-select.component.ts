import { SandfoxNebuFormControlsService } from '../sandfox-nebu-form-controls.service';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sffc-form-select',
  styleUrls: ['./form-select.component.scss'],
  templateUrl: './form-select.component.html',
})
export class FormSelectComponent {
  @Input() placeholder = 'Kérem válasszon egy opciót!';

  @Input() options = [
    { name: 'Első választás', value: 'First Choice' },
    { name: 'Második választás', value: 'Second Choice' },
  ];

  @Input() name = 'Simple';
  @Input() caption = 'Választó';
  @Input() formGroup: FormGroup;

  constructor(protected formService: SandfoxNebuFormControlsService) {}

  getStatus() {
    const control = this.formGroup.controls[this.name];

    return this.formService.getControlStatus(control);
  }
}
