import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosListItemComponent } from './components/todos-list-item/todos-list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditTodoDialogComponent } from './dialogs/edit-todo-dialog/edit-todo-dialog.component';

@NgModule({
  declarations: [
    TodosListComponent,
    TodosListItemComponent,
    EditTodoDialogComponent,
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    SharedModule
  ]
})
export class TodosModule { }
