import {Patient} from '../patient/patient';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class PatientEditServices {



  @Output() changeEdit: EventEmitter<Patient> = new EventEmitter();

  constructor(private subject: Subject<any>) {
  }

  sendPatient(patient: Patient){
    this.subject.next(patient);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }


  emit(patient: Patient) {
    this.changeEdit.emit(patient);
  }

  subscribe( cb ) {
    return this.changeEdit.subscribe( cb );
  }


}
