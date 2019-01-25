import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  yesnoobj = [
    {id:1,name:"Yes"},
    {id:2,name:"No"}
  ];
  int_status = [
    {name:"NotDecided"},
    {name:"Pass"},
    {name:"Fail"}
  ];

  jobid:string;
  job: any[]=[];
  constructor(private cService: CandidateService,
              private route: ActivatedRoute,
              private router: Router,
              private jobservice: JobService
            ) { }

  ngOnInit() {
    this.jobid = this.route.snapshot.paramMap.get('jobid');
    this.jobservice.findjob(this.jobid)
    .subscribe(job => {
       this.job = job; 
       console.log("Job Id is " + this.jobid); 
       console.log("Job Object = ");
       console.log(this.job);
    });
  }

  submit(c) {
    console.log(c);
    this.cService.addCandidate(c)
    .subscribe(response => {
      this.router.navigate(['candidates']);

    })
  }

}
