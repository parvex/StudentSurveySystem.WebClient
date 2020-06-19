import { Component, OnInit } from '@angular/core';
import { SurveysService, SurveyDto } from '../generated-api-client';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.sass']
})
export class SurveysListComponent implements OnInit {

  pageSize = 20;
  filterText = "";

  surveys: Array<SurveyDto>;

  constructor(private surveysService: SurveysService) {}

  ngOnInit(): void {
    this.surveysService.surveysMySurveysGet().subscribe(data => this.surveys = data);
  }

  onFilter(){
    this.surveysService.surveysMySurveysGet(this.filterText, 0, this.pageSize).subscribe(data => this.surveys = data)
  }

  onScrollDown(){
    this.surveysService.surveysMySurveysGet(this.filterText, this.surveys.length/this.pageSize, this.pageSize).subscribe(data => this.surveys.push(...data))
  }
}
