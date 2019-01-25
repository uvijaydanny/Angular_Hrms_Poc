import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { DataTableResource } from 'angular5-data-table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PanelComponent } from '../panel/panel.component';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-dspcand',
  templateUrl: './dspcand.component.html',
  styleUrls: ['./dspcand.component.css']
})
export class DspcandComponent implements OnInit {

  candidates:any[]=[];
  tableResource : DataTableResource<any[]>;
  items: any[]=[];
  filteredCand:any[]=[];
  itemCount:number;
  constructor(private cServices: CandidateService,
              private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cServices.findAllCandidates()
    .subscribe(cand => {
      this.candidates = cand;
      console.log(cand);
      this.initializeTable(this.candidates);
    })
  }

  private initializeTable(cand: any[]){
    console.log(this.candidates);
    this.tableResource = new DataTableResource(cand);
    this.tableResource.query({ offset: 0 }).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  } 

  filtertable(query:string){
    console.log(query);
    let filteredCand = (query) ?
    this.candidates.filter(c => (c.firstName as string).toLowerCase().includes(query.toLowerCase())): this.candidates;
    this.initializeTable(filteredCand);
  }


  reloadItems(params) {
    if(!this.tableResource) return;

    this.tableResource.query(params).then(items => this.items = items);
  }
  
  openDialog(candidateId){
    const dialogRef = this.dialog.open(PanelComponent,{
      data: candidateId
    });
  }

  dspAddress(candidateId){
    const dialogRef= this.dialog.open(AddressComponent,{
      data:candidateId
    })
  }
}
