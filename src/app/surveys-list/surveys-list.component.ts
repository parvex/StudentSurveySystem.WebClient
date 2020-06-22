import { Component, OnInit } from '@angular/core';
import { SurveysService, SurveyDto, SurveyListItemDto } from '../generated-api-client';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.scss']
})
export class SurveysResultsListComponent implements OnInit {

  pageSize = 20;
  filterText = "";

  surveys: Array<SurveyListItemDto>;

  constructor(private surveysService: SurveysService, private spinner : NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.surveysService.surveysMySurveysGet().subscribe(data => {this.surveys = data; this.spinner.hide();} );
  }

  onFilter(){
    this.spinner.show();
    this.surveysService.surveysMySurveysGet(this.filterText, 0, this.pageSize).subscribe(data => {this.surveys = data; this.spinner.hide();})
  }

  onScrollDown(){
    this.spinner.show();
    this.surveysService.surveysMySurveysGet(this.filterText,  this.surveys.length/this.pageSize, this.pageSize).subscribe(data => {this.surveys.push(...data); this.spinner.hide();})
  }
}
