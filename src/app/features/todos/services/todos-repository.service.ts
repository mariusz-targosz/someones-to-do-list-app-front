import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoCreate } from '../models/todo-create.model';
import { TodoList } from '../models/todo-list.model';
import { TodoUpdate } from '../models/todo-update.model';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosRepositoryService {

  constructor(private readonly _http: HttpClient) {
  }

  list(pageSize: number, pageNumber: number): Observable<TodoList> {
    return this._http.get<TodoList>(API_ROUTES.LIST(pageSize, pageNumber));
  }

  create(todoCreate: TodoCreate): Observable<Todo> {
    return this._http.post<Todo>(API_ROUTES.CREATE, todoCreate);
  }

  update(id: string, todoUpdate: TodoUpdate): Observable<void> {
    return this._http.put<void>(API_ROUTES.UPDATE(id), todoUpdate);
  }

  delete(id: string): Observable<void> {
    return this._http.delete<void>(API_ROUTES.DELETE(id));
  }
}

const API_ROUTES = {
  LIST: (pageSize: number, pageNumber: number) => `/api/todos?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  CREATE: '/api/todos',
  UPDATE: (id: string) => `/api/todos/${encodeURIComponent(id)}`,
  DELETE: (id: string) => `/api/todos/${encodeURIComponent(id)}`,
}
