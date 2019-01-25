import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class CandidateService {

  url = 'http://localhost:8081';
  constructor(private http: Http,
              private authHttp: AuthHttp
  ) { }

  addCandidate(c){
    return this.authHttp.post(this.url+'/addCand',c)
    .map(response => response.json());
  }

  findAllCandidates() {
    return this.authHttp.get(this.url + '/allCand')
    .map(response => response.json());
  }

  findOneCandidate(candid:string) {
    return this.authHttp.get(this.url + '/candidates/' + candid)
    .map(response => response.json());
  }
  getCandidateAddress(candid:string){
    return this.authHttp.get(this.url+'/candidate_address/' + candid)
    .map(response => response.json());
  }

}
