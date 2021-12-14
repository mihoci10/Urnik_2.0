import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DodajPredmetComponent } from './dodaj-predmet/dodaj-predmet.component';
import { DodajProfesorjaComponent } from './dodaj-profesorja/dodaj-profesorja.component';
import { UrnikComponent } from './urnik/urnik.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    DodajPredmetComponent,
    DodajProfesorjaComponent,
    UrnikComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
