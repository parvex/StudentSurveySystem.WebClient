import { Component, OnInit } from '@angular/core';
import { SurveysService, SurveyDto } from '../generated-api-client';

@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.sass']
})
export class SurveysListComponent implements OnInit {

  surveys: Array<SurveyDto>;

  constructor(private surveysService: SurveysService) {}

  ngOnInit(): void {
    this.surveysService.surveysMySurveysGet().subscribe(data => {this.surveys = data; console.log(this.surveys);});
  }


}
