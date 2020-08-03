import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorParserService {

  constructor(private toastr: ToastrService) { }


  parseAndShowErrors(response){
    let errorMessage = '';
    let errors = response?.error?.errors;
    if(errors){
      let entries = Object.entries(errors);
      entries.forEach(element => {
        (element[1] as Array<string>).forEach(text => {
          errorMessage += text + '\n';
        });
      });
    }

    this.toastr.error(errorMessage, 'Error');
    }
}
