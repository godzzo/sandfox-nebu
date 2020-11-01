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

@NgModule({
  declarations: [FormTextboxComponent],
  imports: [
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
  exports: [FormTextboxComponent],
})
export class SandfoxNebuFormControlsModule {}
