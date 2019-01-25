import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PanelService } from '../services/panel.service';
import { DataTableResource } from 'angular5-data-table';
import { FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UpdInterviewComponent } from '../upd-interview/upd-interview.component';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {

  ipList: any[] = [];
  items: any[] = [];
  itemCount: number;
  tableResource: DataTableResource<any[]>;
  filter = new FormControl('');
  constructor(
    private authService: AuthService,
    private pService: PanelService,
    public dialog: MatDialog
  ) {}
 
  ngOnInit() {
    let userid = this.authService.currentUser['userid'];
    this.pService.getInterviewsList(userid)
    .subscribe(ipList => {
      this.ipList = ipList;
      this.initializeTable(ipList);
    });
  }

  openDialog(item) {
    const dialogRef = this.dialog.open(UpdInterviewComponent,{
      width:'250px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      let userid = this.authService.currentUser['userid'];
      this.pService.getInterviewsList(userid)
    .subscribe(ipList => {
      this.ipList = ipList;
      this.initializeTable(ipList);
    });
    })
  }

  initializeTable(ipList){
    this.tableResource = new DataTableResource(ipList);
    this.tableResource.query({offset:0}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }

  reloadItems(param){
    if(!this.tableResource) return;

    this.tableResource.query(param).then(items => this.items = items);
  }
}
