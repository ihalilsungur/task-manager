import { Component, OnInit } from "@angular/core";
import { Day } from "../../models/day";
import { Task } from "../../models/task";
import { CalendarCreatorService } from "../../service/calendar-creator.service";
import { Month } from "../../models/month";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
})
export class CalendarComponent implements OnInit {
  constructor(private calendarCreatorService: CalendarCreatorService) {}

  public currentYear: number;
  public currentMonth: number;

  public month: Month;
  public selectedDay: Day;
  public newTask: Task;

  public weekDays = [
    { title: "Sunday", style: "red" },
    { title: "Monday", style: "" },
    { title: "Tuesday", style: "" },
    { title: "Wednesday", style: "" },
    { title: "Thursday", style: "" },
    { title: "Friday", style: "" },
    { title: "Saturday", style: "red" },
  ];

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.month = this.calendarCreatorService.getCurrentMonth();
    this.currentMonth = this.month.monthNumber;
    this.currentYear = this.month.year;
  }

  // tslint:disable-next-line:typedef
  public onSelectDay(day: Day) {
    this.newTask = new Task();
    this.selectedDay = day;
  }

  // tslint:disable-next-line:typedef
  public onNextMonth() {
    this.currentMonth++;

    if (this.currentMonth === 13) {
      this.currentMonth = 1;
      this.currentYear++;
    }

    this.month = this.calendarCreatorService.getMonth(
      this.currentMonth,
      this.currentYear
    );
  }

  // tslint:disable-next-line:typedef
  public onPrevMonth() {
    this.currentMonth--;

    if (this.currentMonth < 1) {
      this.currentMonth = 12;
      this.currentYear--;
    }

    this.month = this.calendarCreatorService.getMonth(
      this.currentMonth,
      this.currentYear
    );
  }

  // tslint:disable-next-line:typedef
  public onEditTask(task: Task) {
    task.mode = "edit";
  }

  // tslint:disable-next-line:typedef
  public onSaveEditTask(task: Task) {
    task.mode = "show";
  }

  // tslint:disable-next-line:typedef
  public onAddTask() {
    this.selectedDay.tasks.push(this.newTask);

    this.newTask = new Task();
  }
}
