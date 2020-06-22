import { Component, OnInit, Input } from '@angular/core';
import { SurveysService, SurveyListItemDto } from '../generated-api-client';
import { NgxSpinnerService } from 'ngx-spinner';
import { SurveyListType } from './survey-list-type.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.scss']
})
export class SurveyListComponent implements OnInit {

  pageSize = 20;
  filterText = "";
  @Input() surveyListType: SurveyListType;

  surveys: Array<SurveyListItemDto>;
  iconPath: string;
  constructor(private surveysService: SurveysService, private spinner : NgxSpinnerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.surveyListType = this.route.snapshot.data.surveyListType;
    console.log(this.surveyListType);
    this.spinner.show();
    switch(this.surveyListType)
    {
      case SurveyListType.Surveys: {
        this.surveysService.surveysMySurveysGet().subscribe(data => {this.surveys = data; this.spinner.hide();} );
      }
      case SurveyListType.Results: {
        this.surveysService.surveysMySurveysGet().subscribe(data => {this.surveys = data; this.spinner.hide();} );
        break;
      }
      case SurveyListType.SurveyTemplates: {
        this.surveysService.surveysMySurveyTemplatesGet().subscribe(data => {this.surveys = data; this.spinner.hide();} );
        break;
      }
    }
  }

  onFilter(){
    this.spinner.show();
    switch(this.surveyListType)
    {
      case SurveyListType.Surveys: {
        this.surveysService.surveysMySurveysGet(this.filterText, 0, this.pageSize).subscribe(data => {this.surveys = data; this.spinner.hide();})
      }
      case SurveyListType.Results: {
        this.surveysService.surveysMySurveysGet(this.filterText, 0, this.pageSize).subscribe(data => {this.surveys = data; this.spinner.hide();})
        break;
      }
      case SurveyListType.SurveyTemplates: {
        this.surveysService.surveysMySurveyTemplatesGet(this.filterText, 0, this.pageSize).subscribe(data => {this.surveys = data; this.spinner.hide();})
        break;
      }
    }

    this.surveysService.surveysMySurveysGet(this.filterText, 0, this.pageSize).subscribe(data => {this.surveys = data; this.spinner.hide();})
  }

  onScrollDown(){
    this.spinner.show();
    switch(this.surveyListType)
    {
      case SurveyListType.Surveys: {
        this.surveysService.surveysMySurveysGet(this.filterText,  this.surveys.length/this.pageSize, this.pageSize).subscribe(data => {this.surveys.push(...data); this.spinner.hide();})
      }
      case SurveyListType.Results: {
        this.surveysService.surveysMySurveysGet(this.filterText,  this.surveys.length/this.pageSize, this.pageSize).subscribe(data => {this.surveys.push(...data); this.spinner.hide();})
        break;
      }
      case SurveyListType.SurveyTemplates: {
        this.surveysService.surveysMySurveyTemplatesGet(this.filterText,  this.surveys.length/this.pageSize, this.pageSize).subscribe(data => {this.surveys.push(...data); this.spinner.hide();})
        break;
      }
    }
  }
}
