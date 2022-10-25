import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { SignInComponent } from './features/account/pages/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'account',
        children: [
          {
            path: 'sign-in',
            component: SignInComponent,
            data: {
              title: 'Sign In'
            }
          }
        ]
      },
      {
        path: '',
        loadChildren: () => import('./features/todos/todos.module').then(m => m.TodosModule),
        canActivate: [
          AuthGuard
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
