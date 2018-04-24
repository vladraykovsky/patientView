import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../patient/patient';
import {PatientServise} from '../patient/patient.servise';
import {PatientListComponent} from '../patient-list/patient-list.component';
import {PatientIdComponent} from '../patient/PatientIdComponent';
import {PatientEditServices} from './patient-edit.services';


@Component({
  selector: 'app-patient-id-edit',
  templateUrl:'./patient-id-edit.html',
  styleUrls: ['./patient-id.css'],
  providers: [PatientServise , PatientEditServices]

})
export class PatientIdEditComponent implements OnInit{

  serv: any;
  sub: any;
  id: any;
  patient: Patient = new Patient(0);
  @Output() editEmmiter =  new EventEmitter();



  constructor(public route: ActivatedRoute, private services: PatientServise, private router: Router,
              private editServices: PatientEditServices ) {}

  ngOnInit(): void {
    this.sub  = this.route.params.subscribe( params => {
      console.log(params['id_p']);
      this.id = params['id_p'];});

    this.serv = this.services.getPatient(this.id.toString()).subscribe(data =>
      this.patient =<Patient>data);
  }




  saveEdit(){
    this.save();
  }

  save(){
    this.services.update(new Patient(this.patient.patientId , this.patient.name , this.patient.surname , this.patient.dateOfBirth,
                                      this.patient.country, this.patient.state , this.patient.address , this.patient.sex)).
    subscribe(data => {
      this.patient = <Patient> data;
      this.editServices.sendPatient(data);
    });
}

  chancel(){
    this.router.navigateByUrl(PatientIdComponent.patientListUrl);
 }


}
