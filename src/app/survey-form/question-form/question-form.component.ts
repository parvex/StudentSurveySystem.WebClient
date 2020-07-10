import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QuestionDto, QuestionType, ValidationConfig } from 'src/app/generated-api-client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Output() saved = new EventEmitter();

  question: QuestionDto;
  questionTypes = Object.keys(QuestionType).map(i => QuestionType[i]);
  dateRange: Array<Date>;
  questionForm: FormGroup;


  get index() { return this.questionForm.get('index')}
  get questionText() { return this.questionForm.get('questionText')}
  get questionType() { return this.questionForm.get('questionType')}
  get integer() { return this.questionForm.get('validationConfig.integer')}
  get minNumericValue() { return this.questionForm.get('validationConfig.minNumericValue')}
  get maxNumericValue() { return this.questionForm.get('questionText.maxNumericValue')}
  get minDateValue() { return this.questionForm.get('validationConfig.minDateValue')}
  get maxDateValue() { return this.questionForm.get('validationConfig.maxDateValue')}
  get values() { return this.questionForm.get('values')}
  get value() { return this.questionForm.get('value')}
  get regex() { return this.questionForm.get('validationConfig.regex')}

  constructor(public modal: BsModalRef, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      index: [this.question.index, [Validators.required]],
      questionText: [this.question.questionText, [Validators.required]],
      questionType: [this.question.questionType, [Validators.required]],
      values: [this.question.values],
      value: [''],
      validationConfig: this.fb.group({
        integer: [this.question.validationConfig.integer],
        minNumericValue: [this.question.validationConfig.minNumericValue],
        maxNumericValue: [this.question.validationConfig.maxNumericValue],
        minDateValue: [this.question.validationConfig.minDateValue],
        maxDateValue: [this.question.validationConfig.maxDateValue],
        regex: [this.question.validationConfig.regex]
      })
    });
  }

  onAddValue(){
    if(this.value.value){
      if(!this.values.value){
        this.values.setValue([]);
      }
      this.values.value.push(this.value.value);
    }
    this.value.setValue(null);
  }

  onValueDeleteClicked(i){
    this.values.value.splice(i, 1);
  }

  onValueEditClicked(i){

  }

  onSubmit(){
    this.saved.emit(this.questionForm.value);
    this.modal.hide();
  }

  isFormValid(questionForm){
    return questionForm.form.valid && ((this.question?.questionType !== 'SingleSelect' && this.question?.questionType !== 'MultipleSelect') || this.question?.values?.length > 0)
  }

  debug(ValueError: ElementRef){
    console.log(ValueError);
  }
}
