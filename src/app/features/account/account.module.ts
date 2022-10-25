import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AccountHeaderInfoComponent } from './components/account-header-info/account-header-info.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SignInComponent,
    AccountHeaderInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AccountHeaderInfoComponent
  ]
})
export class AccountModule { }
