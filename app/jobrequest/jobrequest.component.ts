import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-jobrequest',
  templateUrl: './jobrequest.component.html',
  styleUrls: ['./jobrequest.component.css']
})
export class JobrequestComponent implements OnInit {

  authUsers:any[];
  empTypes: any[];
  constructor(
    private router: Router,
    private services: JobService,
    private authServices: AuthService 
  ) { }

  ngOnInit() {

    this.authServices.findAllUsers()
    .subscribe(response => {
      this.authUsers = response;
    });

    this.empTypes = [
      { id:1, name:'PERMANENT' },
      {id: 2, name:'CONTRACT'}
    ];
  }

  arrayV(n: number): number[]{
    return Array(n);
  }

  submit(job){
    this.services.create(job)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['jobs']);
    })
  }
}
