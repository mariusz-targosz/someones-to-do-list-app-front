import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export interface GoogleUser {
  info: {
    email: string;
    name: string;
    picture: string;
  }
}

export interface CurrentUser {
  email: string;
  name: string;
  picture: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser?: CurrentUser;

  constructor(private readonly _oAuthService: OAuthService) {
    this._oAuthService.configure(this._getAuthConfiguration());
  }

  get isLoggedIn(): boolean {
    return this._oAuthService.hasValidAccessToken();
  }

  get currentUser(): CurrentUser | undefined {
    return this._currentUser;
  }

  get token(): string {
    return this._oAuthService.getAccessToken();
  }

  async initialize(): Promise<void> {
    return new Promise(resolve => {
      this._oAuthService.loadDiscoveryDocument().then(() => {
        this._oAuthService.tryLoginImplicitFlow().then(() => {
          if (!this._oAuthService.hasValidAccessToken()) {
            this._oAuthService.initLoginFlow();
            resolve();
          } else {
            this._oAuthService.loadUserProfile().then((userProfile) => {
              const googleUser = userProfile as GoogleUser;
              this._currentUser = googleUser.info as CurrentUser;
              resolve();
            })
          }
        });
      });
    })
  }

  signOut(): void {
    this._oAuthService.logOut();
  }

  private _getAuthConfiguration(): AuthConfig {
    const oAuthConfiguration: AuthConfig = {
      issuer: "https://accounts.google.com",
      strictDiscoveryDocumentValidation: false,
      redirectUri: "http://localhost:4200",
      clientId: environment.googleClientId,
      scope: 'openid profile',
    }

    return oAuthConfiguration;
  }
}
