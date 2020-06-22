import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SurveyDto, SurveysService, SurveyResponsesService, SurveyResultsDto } from '../generated-api-client';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss']
})
export class SurveyResultsComponent implements OnInit {


  activeTab = 1;
  id: number;
  surveyResults : SurveyResultsDto;

  constructor(private route: ActivatedRoute, private surveyResponsesService: SurveyResponsesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.surveyResponsesService.surveyResponsesSurveyResultsIdGet(this.id).subscribe(data => this.surveyResults = data);
      }
    );
  }

}
