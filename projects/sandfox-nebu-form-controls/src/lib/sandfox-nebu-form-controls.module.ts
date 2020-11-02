import { CoreUploaderComponent } from './core-uploader/core-uploader.component';
import { FormTextareaComponent } from './textarea/form-textarea.component';
import { FormDatetimePickerComponent } from './datetime-picker/form-datetime-picker.component';
import { CoreDatepickerComponent } from './core-datepicker/core-datepicker.component';
import { FormDatepickerComponent } from './datepicker/form-datepicker.component';
import { FormAutocompleteComponent } from './autocomplete/form-autocomplete.component';
import { FormCheckboxComponent } from './checkbox/form-checkbox.component';
import { FormSelectComponent } from './select/form-select.component';
import { FormTextboxComponent } from './textbox/form-textbox.component';
import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbInputModule,
  NbThemeModule,
  NbButtonModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  NbSelectModule,
  NbIconModule,
  NbListModule,
  NbAutocompleteModule,
  NbProgressBarModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NgxUploaderModule } from 'ngx-uploader';

@NgModule({
  declarations: [
    CoreDatepickerComponent,
    CoreUploaderComponent,

    FormAutocompleteComponent,
    FormCheckboxComponent,
    FormDatepickerComponent,
    FormDatetimePickerComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormTextboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NbThemeModule,

    NbAutocompleteModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDateFnsDateModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbListModule,
    NbProgressBarModule,
    NbRadioModule,
    NbSelectModule,

    NgxMaskModule,
    NgxUploaderModule,
  ],
  exports: [
    CoreDatepickerComponent,
    CoreUploaderComponent,

    FormAutocompleteComponent,
    FormCheckboxComponent,
    FormDatepickerComponent,
    FormDatetimePickerComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormTextboxComponent,
  ],
})
export class SandfoxNebuFormControlsModule {}
