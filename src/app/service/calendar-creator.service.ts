import { Injectable } from "@angular/core";
import {Month} from "../models/month";
import { Week } from "../models/week";
import { Day } from "../models/day";

@Injectable({
  providedIn: "root",
})
export class CalendarCreatorService {
  public currentMonth = new Month();

  private months = [];
  private weekday = [];

  constructor() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const monthIndex = date.getMonth();

    this.months[0] = "January";
    this.months[1] = "February";
    this.months[2] = "March";
    this.months[3] = "April";
    this.months[4] = "May";
    this.months[5] = "June";
    this.months[6] = "July";
    this.months[7] = "August";
    this.months[8] = "September";
    this.months[9] = "October";
    this.months[10] = "November";
    this.months[11] = "December";

    this.weekday[0] = "Sunday";
    this.weekday[1] = "Monday";
    this.weekday[2] = "Tuesday";
    this.weekday[3] = "Wednesday";
    this.weekday[4] = "Thursday";
    this.weekday[5] = "Friday";
    this.weekday[6] = "Saturday";

    this.currentMonth = this.getMonth(monthIndex + 1, currentYear);
  }

  public getCurrentMonth(): Month {
    return this.currentMonth;
  }

  public getMonth(monthNumber: number, year: number): Month {
    const month = new Month();
    month.title = this.months[monthNumber - 1];
    month.monthNumber = monthNumber;
    month.year = year;
    month.days = new Date(year, monthNumber, 0).getDate();

    const daysInWeek = 7;

    let day = 0;
    const maxDay = month.days;

    const weeks = [];

    for (let weekIndex = 0; ; weekIndex++) {
      weeks.push(new Week());

      let weekDayIndex = 0;

      // add days of prev month if they are in first week of next month
      if (weekIndex === 0) {
        weekDayIndex = new Date(`${year}-${monthNumber}-01`).getDay();
        const weekDayName = this.weekday[weekDayIndex];

        for (let i = 0; i < weekDayIndex; i++) {
          weeks[0].days.push(new Day());
        }
      }

      for (; weekDayIndex < daysInWeek; weekDayIndex++) {
        ++day;

        if (day > maxDay) {
          break;
        }

        const date = new Day();
        date.title = day.toString();

        weeks[weekIndex].days.push(date);
      }

      if (day > maxDay) {
        break;
      }
    }

    month.weeks = weeks;

    return month;
  }
}
