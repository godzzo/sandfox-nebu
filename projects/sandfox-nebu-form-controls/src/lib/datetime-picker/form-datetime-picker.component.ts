import { SandfoxNebuFormControlsService } from '../sandfox-nebu-form-controls.service';
import { FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import { format, setHours, setMinutes } from 'date-fns';
import { hu } from 'date-fns/locale';

@Component({
  selector: 'sffc-form-datetime-picker',
  templateUrl: './form-datetime-picker.component.html',
  styleUrls: ['./form-datetime-picker.component.scss'],
})
export class FormDatetimePickerComponent implements OnInit, AfterViewInit {
  @Input() placeholder = 'Kérem válasszon időpontot!';
  @Input() name = 'Simple';
  @Input() caption = 'Dátum választó';

  @Input() set formGroup(formGroup: FormGroup) {
    this._formGroup = formGroup;

    this.initFormControl();
  }

  _formGroup: FormGroup;

  get formGroup() {
    return this._formGroup;
  }

  formControl: FormControl;
  inputStatus: string;
  regExp = new RegExp('^\\d{2}:\\d{2}$');
  defaultValue = '08:00';
  queue: Date;

  @ViewChild('timeInput') input: ElementRef;

  constructor(
    protected formService: SandfoxNebuFormControlsService,
  ) {}

  ngAfterViewInit(): void {
    this.parseInputValue(this.queue);
  }

  ngOnInit(): void {
  }

  initFormControl() {
    this.formControl = this.formGroup.get(this.name) as FormControl;
    this.inputStatus = this.formControl.status;

    if (this.input) {
      this.parseInputValue(this.formControl.value);
    } else {
      this.queue = this.formControl.value;
    }

    this.formControl.registerOnChange((value) => {
      this.setValue(this.formControl.value);
    });

    this.formControl.statusChanges.subscribe((status) => {
      console.log('statusChanges', status);
      this.inputStatus = status;
    });
  }

  parseInputValue(value: Date) {
    if (value) {
      const timeText = format(value, 'HH:mm', { locale: hu });

      this.setInputValue(timeText);
    }
  }

  addTimeToDateOld(date: Date, time: string) {
    const dateText = date.toISOString().substring(0, 10);
    const isoText = `${dateText}T${time}:00.000Z`;

    console.log('addTimeToDate', { isoText, dateVal: Date.parse(isoText) });

    return new Date(Date.parse(isoText));
  }

  addTimeToDate(date: Date, time: string) {
    const hour = parseInt(time.substring(0, 2), 10);
    const minute = parseInt(time.substring(3, 5), 10);

    date = setHours(date, hour);
    date = setMinutes(date, minute);

    return date;
  }

  setValue(value: Date) {
    const inputValue = this.getInputValue();

    if (value) {
      let newDate = this.addTimeToDate(value, this.defaultValue);

      if (this.regExp.test(inputValue)) {
        newDate = this.addTimeToDate(value, inputValue);
      } else {
        this.setInputValue(this.defaultValue);
      }

      if (value.toISOString() !== newDate.toISOString()) {
        this.formControl.setValue(newDate);
      }

      console.log('SET Value', { newDate, value, inputValue });
    } else {
      console.log('NOT Value', { value, inputValue });
    }
  }

  getInputValue() {
    return this.input.nativeElement.value;
  }

  setInputValue(value: string) {
    return (this.input.nativeElement.value = value);
  }

  onTimeInputChanged(event) {
    console.log('onTimeInputChanged', event);

    this.setValue(this.formControl.value);
  }

  getStatus() {
    const control = this.formControl;

    return this.formService.getControlStatus(control);
  }
}
