import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'sffc-form-datepicker',
  templateUrl: 'form-datepicker.component.html',
  styleUrls: ['form-datepicker.component.scss'],
})
export class FormDatepickerComponent implements OnInit {
  @Input() placeholder = 'Kérem válasszon időpontot!';
  @Input() name = 'Simple';
  @Input() caption = 'Dátum választó';

  @Input() afterTemplate: TemplateRef<any>;

  @Input() formGroup: FormGroup;

  constructor() {}

  ngOnInit() {}
}
