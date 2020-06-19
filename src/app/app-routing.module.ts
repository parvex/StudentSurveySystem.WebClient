import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AboutComponent } from './about/about.component';
import { SurveysListComponent } from './surveys-list/surveys-list.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', component: AuthComponent, canActivate:[AuthGuard], children: [
    { path: 'SurveysList', component: SurveysListComponent, data: { expectedRole: 'Lecturer'} },
    { path: 'About', component: AboutComponent }
  ]},
  { path: 'Auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
