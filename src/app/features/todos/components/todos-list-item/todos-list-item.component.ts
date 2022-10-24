import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todos-list-item',
  templateUrl: './todos-list-item.component.html',
  styleUrls: ['./todos-list-item.component.scss']
})
export class TodosListItemComponent {

  @Input()
  todo!: Todo;

  @Output()
  completeEvent = new EventEmitter<Todo>();

  @Output()
  editEvent = new EventEmitter<Todo>();

  isComplete: boolean = false;

  complete() {
    this.isComplete = true;
    this.completeEvent.emit(this.todo);
  }

  edit() {
    this.editEvent.emit(this.todo);
  }
}
