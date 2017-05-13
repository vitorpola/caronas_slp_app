import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//PROVIDERS
import { AuthService } from '../providers/auth-service';
import { PushService } from '../providers/push-service';
import { RidesProvider } from '../providers/rides-provider';
import { UsersProvider } from '../providers/users-provider';
import { HttpClient } from '../providers/http-client';
import { CommentsProvider } from '../providers/comments-provider';

//PAGES
import { LoginPage } from '../pages/login/login';
import { MyInfoPage } from '../pages/my-info/my-info';
import { RidesIndexPage } from '../pages/rides/index/index';
import { RidesFilterPage } from '../pages/rides/filter/filter';
import { RidesNewPage } from '../pages/rides/new/new';
import { RidesShowPage } from '../pages/rides/show/show';
import { MyRidesPage } from '../pages/my-rides/my-rides';
import { MyRidesShowPage } from '../pages/my-rides/show/show';
import { Utils } from '../providers/utils';
import { NewCommentModal } from '../pages/comments/new';
import { RegisterPage } from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { FeedbackPage } from '../pages/feedback/feedback';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MyInfoPage,
    NewCommentModal,
    RegisterPage,
    RidesIndexPage,
    RidesFilterPage,
    RidesShowPage,
    RidesNewPage,
    MyRidesPage,
    MyRidesShowPage,
    AboutPage,
    FeedbackPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    MyInfoPage,
    NewCommentModal,
    RidesIndexPage,
    RidesFilterPage,
    RidesShowPage,
    RidesNewPage,
    MyRidesPage,
    MyRidesShowPage,
    AboutPage,
    FeedbackPage
  ],
  providers: [
    {
      provide: ErrorHandler, useClass: IonicErrorHandler
    },
    HttpClient,
    AuthService,
    PushService,
    Utils,
    RidesProvider,
    CommentsProvider,
    UsersProvider,
  ]
})
export class AppModule { }
