import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Injectable()
export class AuthguardService implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router,
              private dialog: MatDialog
  ) { }


  canActivate(route, state: RouterStateSnapshot){
    let isAuthorised = this.authService.isLogged();
    console.log(isAuthorised);
    if(isAuthorised) return true;
    
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.router.navigateByUrl(state.url);
    })
    return false;
  }
}
