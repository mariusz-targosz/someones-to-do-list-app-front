import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { TodosRepositoryService } from './todos-repository.service';

@Injectable({
  providedIn: 'root'
})
export class TodosListService {
  private readonly _todos = new BehaviorSubject<Todo[]>([]);

  constructor(private readonly _repository: TodosRepositoryService) {
  }

  get todos$(): Observable<Todo[]> {
    return this._todos.asObservable();
  }

  getTodos(): void {
    this._repository.list()
      .subscribe(todos => {
        this._todos.next(todos);
      })
  }
}