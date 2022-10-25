import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodosDialogsService } from '../../dialogs/todos-dialogs.service';
import { TodoCreate } from '../../models/todo-create.model';
import { Todo } from '../../models/todo.model';
import { TodosRepositoryService } from '../../services/todos-repository.service';
import { TodosListService } from '../../services/todos-list.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit, OnDestroy {
  private _subscription!: Subscription;
  private _todos: Todo[] = [];

  title: string = '';
  description: string = '';

  constructor(private readonly _todosListService: TodosListService,
    private readonly _repository: TodosRepositoryService,
    private readonly _dialogService: TodosDialogsService,
    private readonly _toastr: ToastrService) {
  }

  get todos(): Todo[] {
    return this._todos;
  }

  ngOnInit(): void {
    this._todosListService.getTodos();
    this._subscription = this._todosListService.todos$
      .subscribe(todos => {
        this._todos = todos;
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  addTodo(): void {
    const todoCreate: TodoCreate = {
      title: this.title,
      description: this.description
    };

    this._repository.create(todoCreate)
      .subscribe(_ => {
        this._todosListService.getTodos();
        this._clear();
      });
  }

  completeTodo(todo: Todo): void {
    this._repository.delete(todo.id)
      .subscribe(_ => {
        this._toastr.info('The task has been completed');
        this._todosListService.getTodos();
      });
  }

  editTodo(todo: Todo): void {
    this._dialogService.editTodo(todo);
  }

  _clear(): void {
    this.title = '';
  }
}
