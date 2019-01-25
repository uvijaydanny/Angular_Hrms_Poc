import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { PanelService } from '../services/panel.service';


@Component({
  selector: 'app-upd-interview',
  templateUrl: './upd-interview.component.html',
  styleUrls: ['./upd-interview.component.css']
})
export class UpdInterviewComponent implements OnInit {
 
  tableid:FormControl;
  candidateid:FormControl;
  candidateName:FormControl;
  jobreqid:FormControl;
  interviewType:FormControl;
  intComments:FormControl;
  intRating:FormControl;
  intStatus:FormControl;
  
  constructor(
    public dialogRef: MatDialogRef<UpdInterviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pService: PanelService
  ) { 
  this.tableid=new FormControl(data['tableid']);  
  this.candidateid= new FormControl(data['candidateid']);
  this.candidateName= new FormControl(data['candidateName']);
  this.jobreqid= new FormControl(data['jobreqid']);
  this.interviewType= new FormControl(data['interviewType']);
  this.intComments= new FormControl(data['intComments']);
  this.intRating= new FormControl(data['intRating']);
  this.intStatus= new FormControl(data['intStatus']);
    console.log(data);
  }
  
  
  ngOnInit() {
  }
  form: FormGroup;
  submit(){
    this.form = new FormGroup({
       tableid:new FormControl(this.tableid.value),
       candidateid:new FormControl(this.candidateid.value),
       candidateName:new FormControl(this.candidateName.value),
       jobreqid:new FormControl(this.jobreqid.value),
       interviewType:new FormControl(this.interviewType.value),
       intRating:new FormControl(this.intRating.value),
       intComments:new FormControl(this.intComments.value),
       intStatus:new FormControl(this.intStatus.value) 
    });
    console.log(this.form.value);
    this.pService.updInterviewRound(this.form.value)
    .subscribe(response => {
      this.dialogRef.close();
    })
  }

  
}
