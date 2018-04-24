import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';


import { AppComponent } from './app.component';
import {PatientListComponent} from './patient-list/patient-list.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {PatientIdComponent} from './patient/PatientIdComponent';
import {CommentComponent} from './comment/comment.component';
import {CommentService} from './comment/comment.service';
import {PatientAddComponent} from './patient-add/patient.add.component';
import {FormsModule} from '@angular/forms';
import {PatientIdEditComponent} from './patient-edit/patientId.edit.component';
import {PatinetListFilterPipe} from './patient-list/patient-list.filter.pipe';
import {PatientServise} from './patient/patient.servise';
import {Subject} from 'rxjs/Subject';


export const appRoutes: Routes = [
  {path: '', redirectTo: '/patients', pathMatch: 'full'},
  {path: 'patients' , component: PatientListComponent ,
    children: [
      {path: 'add', component: PatientAddComponent },
      {path: ':id', component : PatientIdComponent },
      {path: 'edit/:id_p' , component: PatientIdEditComponent }
    ]  }
];


@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent ,
    PatientIdComponent ,
    CommentComponent ,
    PatientAddComponent,
    PatinetListFilterPipe ,
    PatientIdEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [PatientServise , CommentService , Subject],
  bootstrap: [AppComponent]
})
export class AppModule { }
