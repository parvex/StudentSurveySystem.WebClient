import { Component, OnInit } from '@angular/core';
import { SurveyDto } from '../generated-api-client';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  survey: SurveyDto;

  constructor(public modal: BsModalRef) { }

  ngOnInit(): void {
  }

  onSave(){


  }

}
