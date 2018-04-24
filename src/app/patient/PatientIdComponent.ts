import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PatientServise} from './patient.servise';
import {Patient} from './patient';


@Component ({
  selector:'app-patientid',
  templateUrl: './patientId.html',
  providers: [PatientServise]
})
export class PatientIdComponent implements OnInit , OnDestroy{
  static showComment = 1;
  static patientListUrl: string;
  id: number ;
  sub: any;
  patient?: Patient = new Patient(0);
  serv: any;


  constructor(public route: ActivatedRoute, private services: PatientServise , private router: Router) {

  }

  static setShowComponent(_commentShow: number): void {
    PatientIdComponent.showComment = _commentShow;
  }


  chancel(){
    this.router.navigateByUrl(PatientIdComponent.patientListUrl);

  }



  ngOnInit(): void {
    console.log('in init');
    PatientIdComponent.patientListUrl = this.router.url;
    this.sub  = this.route.params.subscribe( params => {  this.id = params['id'];
                                                       this.paramsChanged(params['id']);});
    this.serv = this.services.getPatient(this.id.toString()).subscribe(data =>
      this.patient =<Patient>data);

  }


  ngOnDestroy(): void {
    console.log('in destroy');
    this.serv.unsubscribe();
    console.log(this.sub.toString());
 //   this.sub.unsubscribe();
  }

  paramsChanged(id) {
    this.serv = this.services.getPatient(this.id.toString()).subscribe(data =>
      this.patient =<Patient>data );

  }


  getShowComponent(): number{
    return PatientIdComponent.showComment;
  }



}
