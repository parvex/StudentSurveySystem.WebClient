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
import { ApiModule, BASE_PATH } from './generated-api-client';

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
    HttpClientModule
  ],
  providers: [{ provide: BASE_PATH, useValue: environment.API_PATH }],
  bootstrap: [AppComponent]
})
export class AppModule { }
