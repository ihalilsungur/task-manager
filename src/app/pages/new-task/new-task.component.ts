import { Component, OnInit } from "@angular/core";
import { Task } from "src/app/models/task";
import { Day } from "src/app/models/day";

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.css"],
})
export class NewTaskComponent implements OnInit {
  public newTask: Task;
  public selectedDay: Day;
  constructor() {}

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef
  public onSelectDay(day: Day) {
    this.newTask = new Task();
    this.selectedDay = day;
  }

  // tslint:disable-next-line: typedef
  public onAddTask() {
    this.selectedDay.tasks.push(this.newTask);
    console.log("new task ---->:", this.newTask);
    this.newTask = new Task();
  }
}
