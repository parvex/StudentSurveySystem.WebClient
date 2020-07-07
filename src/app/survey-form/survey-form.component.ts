import { Component, OnInit } from '@angular/core';
import { SurveyDto, SurveysService, SemesterDto, CourseDto } from '../generated-api-client';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';
import { QuestionFormComponent } from './question-form/question-form.component';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  survey: SurveyDto;
  selectedSemester: SemesterDto;
  semesters : Array<SemesterDto>;
  courses: Subject<Array<CourseDto>>;
  deleteModalRef: BsModalRef;
  questionModalRef: BsModalRef;
  constructor(public modal: BsModalRef, private service: SurveysService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.service.surveysGetSemestersAndMyCoursesGet().subscribe(x => this.semesters = x );
  }

  onSave(){


  }

  onAddQuestion(){
    this.questionModalRef = this.modalService.show(QuestionFormComponent, {class: 'modal-xl'})
  }

  onQuestionEditClicked(id){

  }

  onQuestionDeleteClicked(id, dialog){

  }

  onQuestionDelete(){

  }

}
