import { Component, OnInit, Input } from '@angular/core';
import { SurveysService, SurveyListItemDto, SurveyResponseDto, SurveyResponseListItemDto, SurveyResponsesService, SurveyResponseDetailsDto } from 'src/app/generated-api-client';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss']
})
export class ResponseListComponent implements OnInit {


  @Input() surveyId: number;
  pageSize = 20;
  filterText = "";
  responses: Array<SurveyResponseListItemDto>;
  selectedResponse: SurveyResponseDetailsDto;
  modal: BsModalRef;

  constructor(private surveyResponsesService: SurveyResponsesService, private modalService : BsModalService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.surveyResponsesService.surveyResponsesGet(this.filterText, this.surveyId, 0, this.pageSize).subscribe(data => this.responses = data)
  }

  onScrollDown(){
    this.surveyResponsesService.surveyResponsesGet(this.filterText, this.surveyId,  this.responses.length/this.pageSize, this.pageSize).subscribe(data => this.responses.push(...data))
  }

  onShowClick(content, id: number){
    this.spinner.show();
    this.surveyResponsesService.surveyResponsesIdGet(id).subscribe(data => {
      this.selectedResponse = data;
      this.spinner.hide();
      this.modal = this.modalService.show(content);
    })

  }
}
