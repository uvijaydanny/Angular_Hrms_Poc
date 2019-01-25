import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { BadRequest } from '../common/badrequest';

@Injectable()
export class PanelService {

  url = 'http://localhost:8081';
  constructor(private authHttp: AuthHttp) { }

  addPanel(p) {
    return this.authHttp.post(this.url + '/addPanel',p)
    .map(response => response.json());
  }

  getpanel(candidateid){
    return this.authHttp.get(this.url + '/getPanel/'+ candidateid)
    .map(response => response.json())
    .catch(this.handleRequest);
  }

  getInterviewsList(userid:string){
    return this.authHttp.get(this.url + '/interview_list?userid=' + userid)
    .map(response => response.json());
  }

  updInterviewRound(ipanel){
    return this.authHttp.post(this.url + '/updinterview',ipanel)
    .map(response => response.json)
  }

  private handleRequest(error:Response) {
    if(error.status === 404)
     return Observable.throw(new BadRequest(error));
  }
}
