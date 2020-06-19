import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AboutComponent } from './about/about.component';
import { SurveysListComponent } from './surveys-list/surveys-list.component';


const routes: Routes = [
{ path: '', component: AuthComponent },
{ path: 'Auth', component: AuthComponent },
{ path: 'SurveysList', component: SurveysListComponent },
{ path: 'About', component: AboutComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
