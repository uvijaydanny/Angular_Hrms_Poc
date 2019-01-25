import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-appr-edit',
  templateUrl: './appr-edit.component.html',
  styleUrls: ['./appr-edit.component.css']
})
export class ApprEditComponent implements OnInit {

  jobid: string;
  job: any[]=[];
  jobReceived: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobservices: JobService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.jobid = this.route.snapshot.paramMap.get('jobid');
    this.jobservices.findjob(this.jobid)
    .subscribe(response => {
      this.job = response;
      this.jobReceived = true;
      console.log(response);
    });
  }

  submit(f){
    this.jobservices.updatejob(f)
    .subscribe(response => {
      this.router.navigate(['/jobs']);
    });
  }

  userEqMgr(){
    if(this.job['mgrAuthId'].id == this.authService.currentUser.userid) {
    return true;
    }
    else{ 
    return false;
    }
  }

  userEqFin(){
    if(this.job['finAuthId'].id == this.authService.currentUser.userid) {
    return true;
    }
    else{ 
    return false;
    }
  }

  userEqMgm(){
    if(this.job['mgmAuthId'].id == this.authService.currentUser.userid) {
    return true;
    }
    else{ 
    return false;
    }
  }
}
