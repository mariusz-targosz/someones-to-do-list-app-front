import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ApiPrefixInterceptor } from './http/interceptors/api-prefix.interceptor';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from "ngx-toastr";
import { HeaderComponent } from './layout/header/header.component';
import { AccountModule } from '../features/account/account.module';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CoreRoutingModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    }),
    AccountModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: ['http://localhost:4200/'],
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
