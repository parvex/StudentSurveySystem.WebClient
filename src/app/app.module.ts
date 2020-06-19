import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { SurveysListComponent } from './surveys-list/surveys-list.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiModule, BASE_PATH, Configuration, CurrentUserDto } from './generated-api-client';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    SurveysListComponent,
    SurveyResultsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ApiModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return (JSON.parse(localStorage.getItem("user")) as CurrentUserDto).token;
        },
      },
    })
  ],
  providers: [
    {provide: BASE_PATH, useValue: environment.API_PATH },
    {
      provide: Configuration,
      useFactory: (authSvc: AuthService) => new Configuration({accessToken: authSvc.getAuthToken.bind(authSvc)}),
      deps: [AuthService],
      multi: false
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
