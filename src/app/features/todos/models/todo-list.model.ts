import { Todo } from "./todo.model";

export interface TodoList {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    items: Todo[];
}
