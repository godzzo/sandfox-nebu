import { SandfoxNebuFormControlsService } from './../sandfox-nebu-form-controls.service';
import {
  Component,
  Input,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

export interface FormAutocompleteHandler {
  search(comp, search);
  select(comp, value);
}

@Component({
  selector: 'sffc-form-autocomplete',
  styleUrls: ['./form-autocomplete.component.scss'],
  templateUrl: './form-autocomplete.component.html',
})
export class FormAutocompleteComponent implements OnInit {
  @Input() caption = 'Szűréssel választó';
  @Input() placeholder = 'Kérem gépelje be a keresett opció részletét!';
  @Input() name = 'Simple';
  @Input() formGroup: FormGroup;
  @Input() handler: FormAutocompleteHandler;

  @Output() selectedChange: EventEmitter<any> = new EventEmitter();
  @Output() optionLocated: EventEmitter<any> = new EventEmitter();

  @ViewChild('autoInput') input;

  options = [];
  viewHandleBind: any;
  inputStatus: string;
  selectedOption: any;

  constructor(
    protected formBuilder: FormBuilder,
    protected formService: SandfoxNebuFormControlsService
  ) {
    this.viewHandleBind = this.viewHandle.bind(this);
  }

  ngOnInit() {
    this.bindFormControl();
  }

  // Init value (locate name if it has value), and subscribe to the changes of FormControl
  bindFormControl() {
    if (this.getFormControl().value) {
      this.callSelect(this.getFormControl().value);
    }

    this.inputStatus = this.getFormControl().status;

    this.getFormControl().valueChanges.subscribe((value) => {
      console.log('valueChanges', value);

      this.callSelect(value);
    });

    this.getFormControl().statusChanges.subscribe((status) => {
      console.log('statusChanges', status);
      this.inputStatus = status;
    });
  }

  // Subscribe to the changes of searchInput - to search elements of Request
  onChange() {
    this.callSearch(this.input.nativeElement.value);
  }

  // Request of searcher endpoint - SQL SELECT LIKE...
  callSearch(search = '') {
    this.getFormControl().setValue(null);

    this.handler.search(this, search);
  }

  // Request of the record of the value (code/id)
  callSelect(value) {
    if (value) {
      if (
        !this.selectedOption ||
        (this.selectedOption && this.selectedOption.value !== value)
      ) {
        this.handler.select(this, value);
      }
    }
  }

  // Subscribe to the Autocomplate onSelect event - to set the FormControl value
  onSelectionChange(selection) {
    const found = this.options.find((el) => el.value === selection); // selection.value

    // Very important to set selectedOption FIRST and after that set the FormControl value!
    this.selectedOption = found;

    this.getFormControl().setValue(selection); // selection.value

    console.log('onSelectionChange', selection);

    this.selectedChange.emit(found);
  }

  // Set the name of the selected option to the searchInput
  viewHandle(value) {
    const found = this.options.find((el) => el.value === value);

    if (!found) {
      console.log('Not found!', found);

      return value;
    } else {
      return found.name;
    }
  }

  // Util - quick access to FormControl
  getFormControl() {
    return this.formGroup.get(this.name) as FormControl;
  }

  // Show validation status of the control - for example needed
  getStatus() {
    const control = this.getFormControl();

    return this.formService.getControlStatus(control);
  }

  optionForValue(option: any) {
    this.input.nativeElement.value = option.name;
    this.optionLocated.emit(option);
  }
}
