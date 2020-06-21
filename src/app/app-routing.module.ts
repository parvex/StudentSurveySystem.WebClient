import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AboutComponent } from './about/about.component';
import { SurveysResultsListComponent } from './surveys-list/surveys-list.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';


const routes: Routes = [
  { path: '', component: AboutComponent, canActivate:[AuthGuard]},
  { path: 'SurveysResults', component: SurveysResultsListComponent, canActivate:[AuthGuard], data: { expectedRole: 'Lecturer'}},
  { path: 'SurveysResults/:id', component: SurveyResultsComponent, canActivate:[AuthGuard], data: { expectedRole: 'Lecturer'}},
  { path: 'About', component: AboutComponent },
  { path: 'Auth', component: AuthComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
