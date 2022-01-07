import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, AgendaService, DayService, MonthAgendaService, MonthService, TimelineMonthService, TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { defaultData } from './datasource';

@Component({
  selector: 'app-timetable',
  //templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
  template: `<ejs-schedule [eventSettings]='eventSettings'> </ejs-schedule>`
})

export class TimetableComponent {
    public eventSettings: EventSettingsModel = {
      dataSource: defaultData
    }
}
