import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateService } from '../services/candidate.service';
import { PanelService } from '../services/panel.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { NotFound } from '../common/noFound';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  
  authUsers: any[]=[];
  tel = new FormControl('',Validators.required);
  tech1 = new FormControl('',Validators.required);
  tech2 = new FormControl('',Validators.required);
  mgr = new FormControl('',Validators.required);
  hr = new FormControl('',Validators.required);
  candidate:any[]=[];
  interviewPanel: any[] = [];
  notfound;
  // Json values
  telephonePanel;
  tech1Panel;
  tech2Panel;
  mgrPanel;
  hrPanel;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pService: PanelService,
              private authService: AuthService,
              private cService: CandidateService,
              private dialogRef: MatDialogRef<PanelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
            ) { 
    let candidateId = data;

    this.cService.findOneCandidate(candidateId)
    .subscribe(c => {
      this.candidate = c;
    });
    

    this.authService.findAllUsers().
    subscribe(u => {
      this.authUsers = u;
    });
  
    // Get Existing interview Panel
    this.pService.getpanel(candidateId)
    .subscribe(interviewPanel => this.onPanelRetreived(interviewPanel),
      (error) => {
      if (error instanceof NotFound){
        this.notfound = true;
      }}
    );


  }
  
  onPanelRetreived(ipanel:any){
    console.log(ipanel);
    this.form.get('tableid').patchValue(ipanel[0]['tableid']);
    for (let j=0; j<ipanel[0]['indInterviews'].length; j++)
    {
    for (let i=0; i < this.authUsers.length; i++){
      console.log(ipanel[0]['indInterviews'][j]['intPanel']['id']);
      console.log(this.authUsers[i]['id']);
      if (ipanel[0]['indInterviews'][j]['intPanel']['id'] === this.authUsers[i]['id'])
      {
        // this.form.patchValue({tel: this.authUsers[i]});
        switch(ipanel[0]['indInterviews'][j]['interviewType']){
        
        case "TELEPHONE":
        this.tel = new FormControl(this.authUsers[i]);
        break;

        case "TECHNICAL1":
        this.tech1 = new FormControl(this.authUsers[i]);
        break;

        case "TECHNICAL2":
        this.tech2 = new FormControl(this.authUsers[i]);
        break;

        case "MANAGERIAL":
        this.mgr = new FormControl(this.authUsers[i]);
        break;

        case "HR":
        this.hr = new FormControl(this.authUsers[i]);
        break;
      }
      }
    }}
  }

  Panel = new FormGroup({
    interviewType: new FormControl(''),
    intPanel: new FormControl(''),
    intComments: new FormControl(''),
    intRating: new FormControl(0),
    intStatus: new FormControl('')
  });

  clearPanel() {
  this.Panel = new FormGroup({
    interviewType: new FormControl(''),
    intPanel: new FormControl(''),
    intComments: new FormControl(''),
    intRating: new FormControl(0),
    intStatus: new FormControl('')
  });
}
  ngOnInit() {
    this.form = new FormGroup({
      "tableid": new FormControl(''),      
      "candidate": new FormControl(this.candidate.toString()),
      "indInterviews": new FormArray([])
    });
  }

  addtelPanel(s){
    this.telephonePanel = s.value;
  }
  addtech1Panel(s){
    this.tech1Panel = s.value;
  }
  addtech2Panel(s){
    this.tech2Panel = s.value;
  }

  addmgrPanel(s) {
    this.mgrPanel = s.value;
  }

  addhrPanel(s) {
    this.hrPanel = s.value;
  }

  submit(){
    console.log(this.hr);

    this.Panel.get('interviewType').setValue('TELEPHONE');
    this.Panel.get('intPanel').setValue(this.tel.value);
    this.Panel.get('intStatus').setValue('NotDecided');
    (this.form.get('indInterviews') as FormArray).push(this.Panel);
    this.clearPanel();
    
    this.Panel.get('interviewType').setValue('TECHNICAL1');
    this.Panel.get('intPanel').setValue(this.tech1.value);
    this.Panel.get('intStatus').setValue('NotDecided');
    (this.form.get('indInterviews') as FormArray).push(this.Panel);
    this.clearPanel();
    
    this.Panel.get('interviewType').setValue('TECHNICAL2');
    this.Panel.get('intPanel').setValue(this.tech2.value);
    this.Panel.get('intStatus').setValue('NotDecided');
    (this.form.get('indInterviews') as FormArray).push(this.Panel);
    this.clearPanel();
    
    this.Panel.get('interviewType').setValue('MANAGERIAL');
    this.Panel.get('intPanel').setValue(this.mgr.value);
    this.Panel.get('intStatus').setValue('NotDecided');
    (this.form.get('indInterviews') as FormArray).push(this.Panel);
    this.clearPanel();
    
    this.Panel.get('interviewType').setValue('HR');
    this.Panel.get('intPanel').setValue(this.hr.value);
    this.Panel.get('intStatus').setValue('NotDecided');
    (this.form.get('indInterviews') as FormArray).push(this.Panel);
    this.clearPanel();
    
    this.form.get('candidate').setValue(this.candidate);
    console.log('submitted data');
    console.log(this.form.value);
    
    this.pService.addPanel(this.form.value)
    .subscribe(p => {
      console.log(p);
      this.dialogRef.close();
      this.router.navigate(['candidates']);
    })
  }
}
