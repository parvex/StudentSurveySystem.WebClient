import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { SurveysResultsListComponent } from './surveys-list/surveys-list.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiModule, BASE_PATH, Configuration, CurrentUserDto } from './generated-api-client';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuestionResultsComponent } from './survey-results/question-results/question-results.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ResponseListComponent } from './survey-results/response-list/response-list.component';
import { ResponseDetailsComponent } from './survey-results/response-list/response-details/response-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerService, NgxSpinnerModule } from "ngx-spinner";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    SurveysResultsListComponent,
    SurveyResultsComponent,
    AboutComponent,
    NotFoundComponent,
    QuestionResultsComponent,
    ResponseListComponent,
    ResponseDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ApiModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
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
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
