import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppComponent } from './app.component';
import { JobrequestComponent } from './jobrequest/jobrequest.component';
import { DspjobsComponent } from './dspjobs/dspjobs.component';
import { DataTableModule } from 'angular5-data-table';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';

import { JobService } from './services/job.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { ApprEditComponent } from './appr-edit/appr-edit.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateService } from './services/candidate.service';
import { DspcandComponent } from './dspcand/dspcand.component';
import { PanelComponent } from './panel/panel.component';
import { PanelService } from './services/panel.service';
import { InterviewsComponent } from './interviews/interviews.component';
import { UpdInterviewComponent } from './upd-interview/upd-interview.component';
import { AuthguardService } from './services/authguard.service';
import { AddressComponent } from './address/address.component';

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    JobrequestComponent,
    DspjobsComponent,
    HomeComponentComponent,
    NotfoundComponent,
    LoginComponent,
    NavbarComponent,
    ApprEditComponent,
    CandidateComponent,
    DspcandComponent,
    PanelComponent,
    InterviewsComponent,
    UpdInterviewComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule,
    RouterModule.forRoot([
      {path:'',component:HomeComponentComponent},
      {path:'login',component:LoginComponent}, 
      {path:'jobs', component:DspjobsComponent, canActivate:[AuthguardService]},
      {path:'editjob/:jobid', component:ApprEditComponent, canActivate:[AuthguardService]},
      {path:'reqjob',component:JobrequestComponent, canActivate:[AuthguardService]},
      {path:'interviews',component:InterviewsComponent, canActivate:[AuthguardService]},
      {path:'addcand/:jobid',component:CandidateComponent, canActivate:[AuthguardService]},
      {path:'panel/:candidateid',component:PanelComponent, canActivate:[AuthguardService]},
      {path:'candidates',component:DspcandComponent, canActivate:[AuthguardService]},
      {path:'**',component:NotfoundComponent}
    ]),
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [
    JobService,
    AuthHttp,
    AuthService,
    PanelService,
    AuthguardService,
    CandidateService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ],
  entryComponents: [
    UpdInterviewComponent,
    LoginComponent,
    AddressComponent,
    PanelComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
