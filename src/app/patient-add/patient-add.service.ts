import { Injectable, Output, EventEmitter } from '@angular/core';
import {Patient} from '../patient/patient';

@Injectable()
export class PatientAddService {

  @Output() change: EventEmitter<Patient> = new EventEmitter();


  emit(patient: Patient) {
    this.change.emit(patient);
  }

  subscribe(cb) {
    return this.change.subscribe(cb);
  }

}
