import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'src/app/shared/validators/no-whitespace.validator';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TodosRepositoryService } from '../../services/todos-repository.service';
import { Todo } from '../../models/todo.model';
import { TodoUpdate } from '../../models/todo-update.model';
import { TodosListService } from '../../services/todos-list.service';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent implements OnInit {

  submitInProgress: boolean = false;
  fg!: FormGroup<{
    title: FormControl<string>,
    description: FormControl<string>
  }>;

  constructor(@Inject(MAT_DIALOG_DATA) private readonly dialogData: EditToDoDialogData,
    private readonly _dialogRef: MatDialogRef<EditTodoDialogComponent>,
    private readonly _fb: FormBuilder,
    private readonly _repository: TodosRepositoryService,
    private readonly _todosListService: TodosListService) {
  }

  ngOnInit(): void {
    this.fg = this._fb.nonNullable.group({
      title: new FormControl(this.dialogData.todo.title, {
        nonNullable: true,
        validators: [Validators.required, noWhitespaceValidator]
      }),
      description: new FormControl(this.dialogData.todo.description, {
        nonNullable: true,
        validators: [Validators.required, noWhitespaceValidator]
      })
    });
  }

  showErrors(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && control.invalid;
  }

  editTodo() {
    this.fg.markAsTouched();
    if (this.fg.valid) {
      this.submitInProgress = true;

      const todoUpdate: TodoUpdate = {
        title: this.fg.value.title!,
        description: this.fg.value.description!,
      };

      this._repository.update(this.dialogData.todo.id, todoUpdate)
        .subscribe({
          next: () => {
            this._todosListService.initializeTodos();
            this._dialogRef.close();
          }
        });
    }
  }

  cancelClick(): void {
    this._dialogRef.close();
  }
}

export class EditToDoDialogData {
  todo: Todo;

  constructor(todo: Todo) {
    this.todo = todo;
    Object.freeze(this);
  }
}