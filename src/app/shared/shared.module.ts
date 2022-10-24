import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoWhitespaceDirective } from './directives/no-whitespace.directive';

const MODULES = [
  FormsModule,
  NgbModule,
  MaterialModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [
    NoWhitespaceDirective
  ],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class SharedModule { }
