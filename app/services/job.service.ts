import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class JobService {

  url = 'http://localhost:8081';
  token:string;
  constructor(private http: Http, private authHttp: AuthHttp) {
    this.token = localStorage.getItem('token');
   }

  findAll(userId: string){
    let headers = new Headers();
    headers.set('Authorization','Bearer ' + this.token)
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.get(this.url + '/userjobs?userid='+userId,options)
    .map(response => response.json());
  } 
  
  create(job) {
    return this.authHttp.post(this.url+'/addJob',job)
    .map(response=>response.json());
  }

  findjob(jobid:string) {
    return this.authHttp.get(this.url+'/job?jobid='+jobid)
    .map(response => response.json());
  }

  updatejob(f){
    return this.authHttp.put(this.url+'/updjob',f)
    .map(response => response.json());
  }
}
