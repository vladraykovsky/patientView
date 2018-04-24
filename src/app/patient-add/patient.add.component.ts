import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Patient} from '../patient/patient';
import {PatientIdComponent} from '../patient/PatientIdComponent';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientListComponent} from '../patient-list/patient-list.component';
import {PatientServise} from '../patient/patient.servise';
import {PatientAddService} from './patient-add.service';


@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.html',
  styleUrls: ['./patient-add.css'],
  providers: [PatientServise]

})
export class PatientAddComponent implements OnDestroy{
   patient: Patient = new Patient(0,'','','','','','','');
   sub: any;
   patientId = 0;
   services_sub: any;

   @Output() addEmiter = new EventEmitter();


   constructor(private route: Router,private  patientServices: PatientServise , private sideBar: PatientAddService ){
   }


   addr(){
     this.add();
   }

   add() {
     let patientAdd: Patient = new Patient(this.patient.patientId, this.patient.name, this.patient.surname , this.patient.dateOfBirth ,
     this.patient.country, this.patient.state , this.patient.address , this.patient.sex);
     this.services_sub = this.patientServices.add(patientAdd);
     this.patientServices.add(patientAdd).subscribe(data => {
       patientAdd = <Patient>data ;
        console.log(patientAdd.patientId);
        this.patientId = patientAdd.patientId;
         this.sideBar.emit(<Patient>data);
     });
     patientAdd.patientId= this.patientId;
     console.log('add patient');
     console.log(patientAdd);
   }

   chancel(): void {
     alert(PatientIdComponent.patientListUrl);
     this.route.navigateByUrl(PatientIdComponent.patientListUrl);
   }


  ngOnDestroy(): void {
    //  this.sideBar.unsubscribe();
   //  this.services_sub().unsubscribe();

     //    this.sub.unsubscribe();
  }


}
