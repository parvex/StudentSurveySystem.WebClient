import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QuestionDto, QuestionType, ValidationConfig } from 'src/app/generated-api-client';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  question: QuestionDto;
  questionTypes = Object.keys(QuestionType).map(i => QuestionType[i]);
  dateRange: Array<Date>;
  constructor(public modal: BsModalRef) {
  }

  ngOnInit(): void {
    if(!this.question){
      this.question = {
        validationConfig: {} as ValidationConfig
      } as QuestionDto
    }
    this.dateRange = [this.question.validationConfig.minDateValue, this.question.validationConfig.maxDateValue]

  }

  onAddValue(){

  }

  onValueDeleteClicked(i){

  }

  onValueEditClicked(i){

  }

  onSave(){

  }

}
