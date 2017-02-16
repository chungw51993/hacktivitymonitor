import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { HttpService } from './http.service'

declare const moment: any

@Component({
  selector: 'hd-junior-schedule',
  template: `
  <div *ngFor='let event of events' class="junior event">{{event.summary}} <span *ngIf="event.start">: {{event.start}} </span> </div>
  `,
  providers: [HttpService]
})

export class JuniorScheduleComponent {
  events: any[]
  constructor(private httpService: HttpService, private ref: ChangeDetectorRef) {
    ref.detach()
    const getSchedule = this.getSchedule.bind(this)
    setTimeout(getSchedule, 1200)
  }

  getSchedule() {
    this.httpService.getEvents('hackreactor.com_ljtk4epeeca4bm4b73m09cb4c4@group.calendar.google.com')
    .then( (events) => {
      this.events = [].concat(events.map( (event) => {
        const start = event.start.dateTime ? moment(event.start.dateTime).format('h:mm') : false
        const end = event.start.dateTime ? moment(event.end.dateTime).format('h:mm') : false
        return Object.assign(event, {start: start, end: end})
        }) )
      
      this.ref.detectChanges()
    })
  }
}
