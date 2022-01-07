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
import { ActivityComponent } from './components/activity/activity.component';
import { TimetableComponent } from './components/timetable/timetable.component';

import {ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService} from '@syncfusion/ej2-angular-schedule'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    DodajPredmetComponent,
    DodajProfesorjaComponent,
    UrnikComponent,
    ActivityComponent,
    TimetableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
