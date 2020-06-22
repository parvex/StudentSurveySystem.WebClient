import { Component, OnInit, Input } from '@angular/core';
import { SurveysService, SurveyListItemDto, SurveyDto } from '../generated-api-client';
import { NgxSpinnerService } from 'ngx-spinner';
import { SurveyListType } from './survey-list-type.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.scss']
})
export class SurveyListComponent implements OnInit {

  pageSize = 20;
  filterText = "";
  selectedSurvey: SurveyDto;
  @Input() surveyListType: SurveyListType;

  surveys: Array<SurveyListItemDto>;
  iconPath: string;
  constructor(private surveysService: SurveysService,
    private spinner : NgxSpinnerService,
     private route: ActivatedRoute,
     private router: Router,
     private modalService: NgbModal) {}

  ngOnInit(): void {
    this.surveyListType = this.route.snapshot.data.surveyListType;
    this.spinner.show();
    switch(this.surveyListType)
    {
      case SurveyListType.Surveys: {
        this.surveysService.surveysMySurveysGet().subscribe(data => {this.surveys = data; this.spinner.hide();} );
        break;
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
        break;
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
        break;
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

  onNavigate(id: number, content){
    switch(this.surveyListType)
    {

      case SurveyListType.Results: {
        this.router.navigate([id], { relativeTo: this.route });
        break;
      }
      case SurveyListType.Surveys: {
      }
      case SurveyListType.SurveyTemplates: {
        this.spinner.show();
        this.surveysService.surveysIdGet(id).subscribe(data => {
          this.selectedSurvey = data;
          this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
          this.spinner.hide();
        })
        break;
      }
    }
  }

  onAdd(content){
    this.selectedSurvey = {} as SurveyDto;
    if(this.surveyListType === SurveyListType.SurveyTemplates)
      this.selectedSurvey.isTemplate = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
