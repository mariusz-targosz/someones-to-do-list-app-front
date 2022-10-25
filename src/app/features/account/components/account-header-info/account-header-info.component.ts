import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account-header-info',
  templateUrl: './account-header-info.component.html',
  styleUrls: ['./account-header-info.component.scss']
})
export class AccountHeaderInfoComponent {

  constructor(private readonly _authService: AuthService) {
  }

  get email(): string {
    return this._authService.currentUser?.email!;
  }

  get image(): string {
    return this._authService.currentUser?.picture!;
  }

  signOut(): void {
    this._authService.signOut();
  }
}
