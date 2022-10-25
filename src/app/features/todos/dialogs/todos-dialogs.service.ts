import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from '../models/todo.model';
import { EditTodoDialogComponent } from './edit-todo-dialog/edit-todo-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class TodosDialogsService {

  constructor(private readonly _dialog: MatDialog) {
  }

  editTodo(todo: Todo): void {
    this._dialog.open(EditTodoDialogComponent, {
      width: "30%",
      data: { todo },
    });
  }
}
