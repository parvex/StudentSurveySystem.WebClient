import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QuestionDto, QuestionType, ValidationConfig, StringDoubleNullableValueTuple } from 'src/app/generated-api-client';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Output() saved = new EventEmitter();
  regexValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const questionType = control.get('questionType');
    const regex = control.get('validationConfig.regex');
    var isValid = true;
    try { new RegExp(regex.value);} catch(e) {isValid = false;}
    if((questionType?.value === QuestionType.Text) &&
      !(isValid) )
      return {'regex': 'Invalid'}
    else return null;
  }
  valuesValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const questionType = control.get('questionType');
    const values = control.get('values');
    if((questionType.value === QuestionType.SingleSelect || questionType.value === QuestionType.MultipleSelect || questionType.value === QuestionType.ValuedSingleSelect) &&
      !(values?.value?.length > 0) )
      return {'values': 'You must specify at least one value to select.'}
    else return null;
  }
  minMaxNumericValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const questionType = control.get('questionType');
    const minNumericValue = control.get('validationConfig.minNumericValue');
    const maxNumericValue = control.get('validationConfig.maxNumericValue');
    if(questionType?.value === QuestionType.Numeric && minNumericValue?.value
      && maxNumericValue?.value && minNumericValue?.value > maxNumericValue?.value)
      return {'minMaxNumeric': 'Invalid'};
    else return null;
  }
  minMaxDateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const questionType = control.get('questionType');
    const minValue = control.get('validationConfig.minDateValue');
    const maxValue = control.get('validationConfig.maxDateValue');
    if(questionType?.value === QuestionType.Date && minValue?.value && maxValue?.value && minValue?.value > maxValue?.value)
      return {'minMaxDate': 'Invalid'};
    else return null;
  }
  question: QuestionDto;
  questionTypes = Object.keys(QuestionType).map(i => QuestionType[i]);
  dateRange: Array<Date>;
  questionForm = this.fb.group({
    id: [],
    index: [, [Validators.required]],
    questionText: [, [Validators.required]],
    required: [false],
    questionType: [, [Validators.required]],
    values: [[]],
    selectText: [],
    selectValue: [],
    validationConfig: this.fb.group({
      integer: [false],
      minNumericValue: [],
      maxNumericValue: [],
      minDateValue: [],
      maxDateValue: [],
      regex: []
    }, {validators: []})
  }, {validators: [this.valuesValidator, this.regexValidator, this.minMaxNumericValidator, this.minMaxDateValidator]});


  get index() { return this.questionForm.get('index')}
  get questionText() { return this.questionForm.get('questionText')}
  get required() { return this.questionForm.get('required')}
  get questionType() { return this.questionForm.get('questionType')}
  get integer() { return this.questionForm.get('validationConfig.integer')}
  get minNumericValue() { return this.questionForm.get('validationConfig.minNumericValue')}
  get maxNumericValue() {return this.questionForm.get('validationConfig.maxNumericValue');}
  get minDateValue() { return this.questionForm.get('validationConfig.minDateValue')}
  get maxDateValue() { return this.questionForm.get('validationConfig.maxDateValue')}
  get values() { return this.questionForm.get('values')}
  get selectValue() { return this.questionForm.get('selectValue')}
  get selectText() { return this.questionForm.get('selectText')}
  get regex() { return this.questionForm.get('validationConfig.regex')}

  constructor(public modal: BsModalRef, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if(this.question?.validationConfig?.minDateValue && !(this.question.validationConfig.minDateValue instanceof Date))
      this.question.validationConfig.minDateValue = new Date(this.question.validationConfig.minDateValue);
    if(this.question?.validationConfig?.maxDateValue && !(this.question.validationConfig.maxDateValue instanceof Date))
      this.question.validationConfig.maxDateValue = new Date(this.question.validationConfig.maxDateValue);
    this.questionForm.patchValue(this.question);
  }

  onAddValue(){
    if(this.selectText.value && (this.questionType.value !== 'ValuedSingleSelect' || this.selectValue.value)){
      if(!this.values.value){
        this.values.setValue([]);
      }
      this.values.value.push({item1: this.selectText.value, item2: this.selectValue.value} as StringDoubleNullableValueTuple);
    }
    this.selectValue.setValue(null);
    this.selectText.setValue(null);
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
}
