import { SandfoxNebuFormControlsService } from './../sandfox-nebu-form-controls.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sffc-form-textbox',
  styleUrls: ['./form-textbox.component.scss'],
  templateUrl: './form-textbox.component.html',
})
export class FormTextboxComponent implements OnInit {
  @Input() placeholder = 'Kérem írjon ide!';
  @Input() name = 'Simple';
  @Input() caption = 'Szöveg bevitel';
  @Input() formGroup: FormGroup;

  constructor(protected formService: SandfoxNebuFormControlsService) {}

  ngOnInit() {}

  getStatus() {
    const control = this.formGroup.controls[this.name];

    return this.formService.getControlStatus(control);
  }
}
