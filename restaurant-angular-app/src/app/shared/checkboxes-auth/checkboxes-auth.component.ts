import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';




export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-checkboxes-auth',
  templateUrl: './checkboxes-auth.component.html',
  styleUrls: ['./checkboxes-auth.component.css']
})
export class CheckboxesAuthComponent {

  task: any =  [
    // name: 'Indeterminate',
    // completed: false,
    // color: 'primary',
    // subtasks: [
      {name: 'Admin', completed: false, color: 'primary'},
      {name: 'User', completed: false, color: 'accent'},
      // name: 'User', completed: false, color: 'accent'
    ]
  

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  // setAll(completed: boolean) {
  //   this.allComplete = completed;
  //   if (this.task.subtasks == null) {
  //     return;
  //   }
  //   this.task.subtasks.forEach(t => t.completed = completed);
  // }
}