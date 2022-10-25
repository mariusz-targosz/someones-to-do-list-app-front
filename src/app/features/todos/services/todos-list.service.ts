import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoList } from '../models/todo-list.model';
import { TodosRepositoryService } from './todos-repository.service';

@Injectable({
  providedIn: 'root'
})
export class TodosListService {
  private readonly _todos = new BehaviorSubject<TodoList>({} as TodoList);

  constructor(private readonly _repository: TodosRepositoryService) {
  }

  get todos$(): Observable<TodoList> {
    return this._todos.asObservable();
  }

  getTodos(pageSize: number, pageNumber: number): void {
    this._repository.list(pageSize, pageNumber)
      .subscribe(todos => {
        this._todos.next(todos);
      })
  }

  initializeTodos(): void {
    this._repository.list(100, 1)
      .subscribe(todos => {
        this._todos.next(todos);
      })
  }
}