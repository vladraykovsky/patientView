import {Component, OnInit} from '@angular/core';
import {Patient} from '../patient/patient';
import {Router} from '@angular/router';
import {PatientServise} from '../patient/patient.servise';
import {PatientAddService} from '../patient-add/patient-add.service';
import {PatientEditServices} from '../patient-edit/patient-edit.services';



@Component ({
  selector: 'app-patient-list',
  templateUrl: './patientlist.html',
  styleUrls: ['./patient-list.css'],
  providers: [PatientServise, PatientAddService , PatientEditServices]
})

export class PatientListComponent implements OnInit {
  patients: Patient[] = [];

  search = '';
  serv: any;

  patientPointer?: Patient;


  constructor(private router: Router, private patientservices: PatientServise,
              private sideBarService: PatientAddService, private ediitServices: PatientEditServices) {
  }


  ngOnInit(): void {
    this.serv = this.patientservices.getListUser();
    this.serv.subscribe(data => {
      this.patients = <Patient[]> data;
    });
   this.patientservices.getFirst().subscribe( (data) => {
     this.patientPointer = <Patient>data;
      console.log(this.patientPointer);
    }, () => {this.patientPointer = new Patient(0);});

    this.sideBarService.subscribe( data => {
      this.patients.push(data);
      console.log(data);
    });

    this.ediitServices.getMessage().subscribe( data => {
      this.patientPointer = data;
      for (let i = 0; i < this.patients.length; i++){
        if (this.patients[i].patientId === data.patientId){
          this.patients[i] = data;
          }
        }
      }
    );
  }


  GoToEditComponent() {
    this.router.navigateByUrl('patients/' + 'edit/' + this.patientPointer.patientId.toString());
  }

  deletePatient() {
    const index = this.patients.indexOf(this.patientPointer);
    this.patients.splice(index,1);
    this.patientservices.delete(this.patientPointer.patientId)
      .subscribe(data =>
      {this.patientPointer = <Patient> data;
      this.patients.filter(p => p !== this.patientPointer);  });
    this.patientPointer = this.patients[index+1];

  }

  onClick(patient: Patient) {
    this.patientPointer=patient;
  }

}





