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
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FormCheckboxComponent,
    FormSelectComponent,
    FormTextboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NbThemeModule,

    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbListModule,
    NbRadioModule,
    NbSelectModule,
  ],
  exports: [
    FormCheckboxComponent,
    FormSelectComponent,
    FormTextboxComponent,
  ],
})
export class SandfoxNebuFormControlsModule {}
