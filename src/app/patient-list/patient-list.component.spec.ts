import {PatientAddService} from '../patient-add/patient-add.service';
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {Patient} from '../patient/patient';
import { Location, CommonModule } from '@angular/common';
import {PatientListComponent} from './patient-list.component';
import {PatinetListFilterPipe} from './patient-list.filter.pipe';
import {PatientServise} from '../patient/patient.servise';
import {PatientEditServices} from '../patient-edit/patient-edit.services';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app.module';
import {FormsModule} from '@angular/forms';
import {AppComponent} from '../app.component';
import {PatientAddComponent} from '../patient-add/patient.add.component';
import {PatientIdEditComponent} from '../patient-edit/patientId.edit.component';
import {PatientIdComponent} from '../patient/PatientIdComponent';
import {CommentComponent} from '../comment/comment.component';
import {Subject} from 'rxjs/Subject';
import {CommentService} from '../comment/comment.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';




class MockPatientServise extends PatientServise{
}

class MockPatientEditServices extends PatientEditServices{}


describe('PatientAddService', () => {

  let patient: Patient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientAddService]
    });
  });

  it('should be created',
    inject([PatientAddService], (service: PatientAddService) => {
      expect(service).toBeTruthy();
    }));
  it('should not be created',
    inject([], (service: PatientAddService) => {
      expect(service).toBeFalsy();
    }));

  it('should be an emmit method',
    inject([PatientAddService], (service: PatientAddService) => {
      expect(service.emit).toBeTruthy();
    }));

  it('should check side effects',
    inject([PatientAddService], (service: PatientAddService) => {
      patient = new Patient(2,'Vlad','Raykovsky','df','df','df','df','dfg');
      expect(service.emit(patient));
    }));

  it('should check null effects',
    inject([PatientAddService], (service: PatientAddService) => {
      patient = null;
      expect(service.emit(patient)).toBeFalsy();
    }));

});

describe('PatinetListFilterPipe', () => {

  let patientListFilterPipe:  PatinetListFilterPipe;
  let patients: Patient[];


  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PatinetListFilterPipe],
  }));

  beforeEach(inject([PatinetListFilterPipe], p => {
    patientListFilterPipe = p;
    patients = [new Patient (1, 'A', 'A'), new Patient(2 , 'B' , 'B')];
  }));

  it('test filter with no input', () => {
    expect(patientListFilterPipe.transform(patients,'')).toBe(patients);
  });


  it('test filter with  wrong input', () => {
    const expec = patientListFilterPipe.transform(patients,'dsfsdfds');
    const result = new Array<Patient>();
    expect(expec).toEqual(result);
  });



  it('test filter with correct input', () => {
    const expec = patientListFilterPipe.transform(patients,'A');
    const result = new Array(new Patient(1 , 'A', 'A'));
    expect(expec).toEqual(result);
  });


  it('test filter with superexchange input', () => {
    const expec = patientListFilterPipe.transform(patients,'A B');
    const result = new Array();
    expect(expec).toEqual(result);
  });

  afterEach(()=> {
    patients = null;
    patientListFilterPipe=null;
    localStorage.clear();
  });

});


describe('Patient List Component',()=> {

  let fixture: ComponentFixture<PatientListComponent>;
  let patientListComponent: PatientListComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        RouterTestingModule.withRoutes(appRoutes),
        HttpClientModule],
      declarations: [ PatientListComponent, PatientAddComponent,
        PatientIdEditComponent , PatientIdComponent,
        PatinetListFilterPipe, CommentComponent]
    }).overrideComponent(PatientListComponent, {
      set: {
        providers: [
          {provide: PatientServise, useClass: MockPatientServise},
          {provide: PatientAddService, useClass: PatientAddService},
          {provide: PatientEditServices, useClass: Subject}
        ]
      }
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(PatientListComponent);
      patientListComponent = fixture.componentInstance;
    });
  }));

  it('edit patient route', () => {

    patientListComponent.patientPointer = new Patient(2,'Vlad','Raykovsky');
    spyOn(patientListComponent, 'btnClick');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(patientListComponent.btnClick).toBeTruthy();
    });
  });


/*
  it('should go to add',
    async(inject([Router, Location], (router: Router, location: Location) => {

      fixture = TestBed.createComponent(PatientListComponent);
      fixture.detectChanges();
      fixture.debugElement.query(By.css('a')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path).toBeTruthy();
        console.log(location.path);
      });
    })));
*/



});

