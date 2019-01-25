import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
              private dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log(this.authService.username);    
  }

  openDialog(){
    const dialogRef = this.dialog.open(LoginComponent);
     
  }
}
