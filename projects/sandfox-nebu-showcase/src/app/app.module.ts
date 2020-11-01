import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbLayoutModule, NbThemeModule, NbCardModule } from '@nebular/theme';
import { NbSidebarModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

import { SandfoxNebuFormControlsModule } from 'sandfox-nebu-form-controls';

import { FoobarFormComponent } from './foobar-form/foobar-form.component';

@NgModule({
  declarations: [AppComponent, FoobarFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,

    FormsModule,
    ReactiveFormsModule,

    NbCardModule,

    SandfoxNebuFormControlsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
