import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CandidateService } from '../services/candidate.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  address: any[] = [];
 constructor(private dialogRef: MatDialogRef<AddressComponent>,
    private cService: CandidateService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.cService.getCandidateAddress(data)
      .subscribe(address => {
        console.log(address);
        this.address = address;
     })
    }

  ngOnInit() {

  }

}
