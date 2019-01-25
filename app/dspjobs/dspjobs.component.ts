import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { DataTableResource } from 'angular5-data-table';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'dspjobs',
  templateUrl: './dspjobs.component.html',
  styleUrls: ['./dspjobs.component.css']
})
export class DspjobsComponent implements OnInit {

  jobs:any[]=[];
  items: any[]=[];
  filteredJobs:any[]=[];
  itemCount:number;
  tableResource: DataTableResource<any[]>;
  constructor(private services: JobService,
  private authService: AuthService) { }

  ngOnInit() {
    console.log(this.authService.currentUser);
    this.services.findAll(this.authService.currentUser.userid).subscribe(jobs =>{
      this.jobs = jobs;
      this.filteredJobs = jobs;
      console.log(jobs);
      this.initializeTable(this.filteredJobs);
    });
  }

  filtertable(query:string){
    console.log(query);
    this.filteredJobs = (query) ?
    this.jobs.filter(j => (j.jobreqid as string).toLowerCase().includes(query.toLowerCase())): this.jobs;
    this.initializeTable(this.filteredJobs);
  }

  reloadItems(params) {
    if(!this.tableResource) return;

    this.tableResource.query(params).then(items => this.items = items);
  }

  private initializeTable(jobs: any[]){
    this.tableResource = new DataTableResource(jobs);
    this.tableResource.query({ offset: 0 }).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }

}
