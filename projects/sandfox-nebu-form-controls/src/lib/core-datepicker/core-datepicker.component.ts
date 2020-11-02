import { SandfoxNebuFormControlsService } from './../sandfox-nebu-form-controls.service';
import { FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NbDatepickerDirective } from '@nebular/theme';

@Component({
  selector: 'sffc-core-datepicker',
  templateUrl: './core-datepicker.component.html',
  styleUrls: ['./core-datepicker.component.scss'],
})
export class CoreDatepickerComponent implements AfterViewInit, OnInit {
  @Input() placeholder = 'Kérem válasszon időpontot!';
  @Input() name = 'Simple';
  @Input() caption = 'Dátum választó';

  _formGroup: FormGroup;

  inputStatus: string;

  @Input() set formGroup(formGroup: FormGroup) {
    this._formGroup = formGroup;

    this.initFormControl();
  }

  get formGroup() {
    return this._formGroup;
  }

  min: Date;
  max: Date;

  @ViewChild('dateInput') input: ElementRef;
  @ViewChild(NbDatepickerDirective) picker: NbDatepickerDirective<any>;

  formControl: FormControl;

  constructor(protected formService: SandfoxNebuFormControlsService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setValue(this.formControl.value);
  }

  initFormControl() {
    this.formControl = this.formGroup.get(this.name) as FormControl;
    this.inputStatus = this.formControl.status;

    if (this.input) {
      this.setValue(this.formControl.value);
    }

    this.formControl.registerOnChange((value) => {
      this.setValue(this.formControl.value);
    });

    this.formControl.statusChanges.subscribe((status) => {
      console.log('statusChanges', status);
      this.inputStatus = status;
    });
  }

  setValue(value) {
    // TODO: correct the TimeZone problem!
    this.picker.writeValue(value);
  }

  onDateChange(event) {
    this.formControl.setValue(event);
  }

  onInputChanged(event) {
    console.log('onInputChanged', event.target.value);

    // TODO: Check ISO Date!
    if (isNaN(Date.parse(this.input.nativeElement.value))) {
      this.formControl.setValue(null);
    } else {
      this.formControl.setValue(new Date(this.input.nativeElement.value));
    }
  }

  getFormControl() {
    return this.formGroup.controls[this.name];
  }

  getStatus() {
    const control = this.getFormControl();

    return this.formService.getControlStatus(control);
  }
}
