import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbLayoutModule, NbThemeModule, NbCardModule, NbDatepickerModule } from '@nebular/theme';
import { NbSidebarModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

import { SandfoxNebuFormControlsModule } from 'sandfox-nebu-form-controls';

import { FoobarFormComponent } from './foobar-form/foobar-form.component';

// import { hu } from 'date-fns/locale';

import localeHu from '@angular/common/locales/hu';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeHu, 'hu-HU');


@NgModule({
  declarations: [AppComponent, FoobarFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule,

    FormsModule,
    ReactiveFormsModule,

    NbCardModule,

    NgxMaskModule.forRoot(),

    SandfoxNebuFormControlsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
