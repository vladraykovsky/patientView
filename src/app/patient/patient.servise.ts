import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Patient} from './patient';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class PatientServise {

  constructor(private http: HttpClient) {}

  getPatient(id: string): Observable<any> {
    return this.http.get<any>(('https://morning-anchorage-39495.herokuapp.com/api/patient/' + id.toString()));
}


  update(patient: Patient){
    return this.http.patch<any>('https://morning-anchorage-39495.herokuapp.com/api/patient/update',patient);
  }


  add(patient: Patient){
    return this.http.post<any>('https://morning-anchorage-39495.herokuapp.com/api/patient/add',patient);
  }

  delete(patientId: number){
    return this.http.delete<any>('https://morning-anchorage-39495.herokuapp.com/api/patient/'+patientId.toString());
  }


  getListUser(): Observable<any> {
    return this.http.get<any>('https://morning-anchorage-39495.herokuapp.com/api/patient');
  }

  getFirst(){
    return this.http.get<any>('https://morning-anchorage-39495.herokuapp.com/api/patient/first');
  }





}
