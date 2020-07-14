import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QuestionDto, QuestionType, ValidationConfig } from 'src/app/generated-api-client';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Output() saved = new EventEmitter();
  valuesValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const questionType = control.get('questionType');
    const values = control.get('values');
    if((questionType.value === QuestionType.SingleSelect || questionType.value === QuestionType.SingleSelect) &&
      !(values?.value?.length > 0) )
      return {'values': 'You must specify at least one value to select.'}
    else return null;
  }
  question: QuestionDto;
  questionTypes = Object.keys(QuestionType).map(i => QuestionType[i]);
  dateRange: Array<Date>;
  questionForm = this.fb.group({
    index: ['', [Validators.required]],
    questionText: ['', [Validators.required]],
    questionType: ['', [Validators.required]],
    values: [[]],
    value: [''],
    validationConfig: this.fb.group({
      integer: [false],
      minNumericValue: [''],
      maxNumericValue: [''],
      minDateValue: [''],
      maxDateValue: [''],
      regex: ['']
    })
  }, {validators: this.valuesValidator});


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
    this.questionForm.patchValue(this.question);
  }

  onAddValue(){
    if(this.value.value){
      if(!this.values.value){
        this.values.setValue([]);
      }
      this.values.value.push(this.value.value);
    }
    this.value.setValue(null);
    this.values.updateValueAndValidity();
  }

  onValueDeleteClicked(i){
    this.values.value.splice(i, 1);
    this.values.updateValueAndValidity();
  }

  onValueEditClicked(i){


    this.values.updateValueAndValidity();
  }

  onSubmit(){
    this.saved.emit(this.questionForm.value);
    this.modal.hide();
  }

  isFormValid(questionForm){
    return questionForm.form.valid && ((this.question?.questionType !== 'SingleSelect' && this.question?.questionType !== 'MultipleSelect') || this.question?.values?.length > 0)
  }
}
