import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoCreate } from '../models/todo-create.model';
import { TodoUpdate } from '../models/todo-update.model';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosRepositoryService {

  constructor(private readonly _http: HttpClient) {
  }

  list(): Observable<Todo[]> {
    return this._http.get<Todo[]>(API_ROUTES.TODOS);
  }

  create(todoCreate: TodoCreate): Observable<Todo> {
    return this._http.post<Todo>(API_ROUTES.TODOS, todoCreate);
  }

  update(todoUpdate: TodoUpdate): Observable<void> {
    return this._http.put<void>(API_ROUTES.TODOS, todoUpdate);
  }

  delete(id: string): Observable<void> {
    return this._http.delete<void>(API_ROUTES.DELETE(id));
  }
}

const API_ROUTES = {
  TODOS: '/api/todos',
  UPDATE: (id: string) => `/api/todos/${encodeURIComponent(id)}`,
  DELETE: (id: string) => `/api/todos/${encodeURIComponent(id)}`,
}
