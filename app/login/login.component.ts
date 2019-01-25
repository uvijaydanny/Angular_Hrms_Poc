import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  invalidLogin: boolean; 

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private router: Router, 
    private authService: AuthService) { }

  signIn(credentials) {
    console.log(credentials);
    this.authService.login(credentials)
      .subscribe(result => { 
        if (result)
          {
          this.dialogRef.close();
        }},
    (error:Response)=>{
      if(error.status === 401){
        this.invalidLogin = true;
      }
    });
  }
}
