import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { merge, of, startWith, Subscription, switchMap } from 'rxjs';
import { TodosDialogsService } from '../../dialogs/todos-dialogs.service';
import { TodoCreate } from '../../models/todo-create.model';
import { Todo } from '../../models/todo.model';
import { TodosRepositoryService } from '../../services/todos-repository.service';
import { TodosListService } from '../../services/todos-list.service';
import { ToastrService } from "ngx-toastr";
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit, OnDestroy {

  private _subscription!: Subscription;
  private _todos: Todo[] = [];
  private _total: number = 0;

  title: string = '';
  description: string = '';

  @ViewChild(MatPaginator, { static: true }) private paginator!: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  currentPage = 1;

  constructor(private readonly _todosListService: TodosListService,
    private readonly _repository: TodosRepositoryService,
    private readonly _dialogService: TodosDialogsService,
    private readonly _toastr: ToastrService) {
  }

  get todos(): Todo[] {
    return this._todos;
  }

  get total(): number {
    return this._total;
  }

  ngOnInit(): void {
    this._todosListService.getTodos(this.pageSize, this.currentPage);
    this._subscription = this._todosListService.todos$
      .subscribe(todos => {
        this._total = todos.totalCount;
        this._todos = todos.items;
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
        this._todosListService.getTodos(this.pageSize, this.currentPage);
        this._clear();
      });
  }

  completeTodo(todo: Todo): void {
    this._repository.delete(todo.id)
      .subscribe(_ => {
        this._toastr.info('The task has been completed');
        this._todosListService.getTodos(this.pageSize, this.currentPage);
      });
  }

  editTodo(todo: Todo): void {
    this._dialogService.editTodo(todo);
  }

  pageChanged(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex + 1;
    this._todosListService.getTodos(this.pageSize, this.currentPage);
  }

  _clear(): void {
    this.title = '';
  }
}
