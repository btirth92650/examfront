
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  generateToken: any;
  

  constructor(private snak: MatSnackBar, private login:LoginService, private router:Router) { }

  loginData = {
    username: '',
    password: '',
  }

  ngOnInit(): void { }

  formSubmit() {

    console.log("login btn click")
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      //  alert('User is Required !!');
      this.snak.open('Username is Required !!', '', {
        duration: 3000,
        //verticalPosition: 'top', horizontalPosition: 'start'
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      //  alert('User is Required !!');
      this.snak.open('Password is Required !!', '', {
        duration: 3000,
        //verticalPosition: 'top', horizontalPosition: 'start'
      });
      return;
    }
    // Request to server Generate token

    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('Success');
        console.log(data);
        
        // Login..
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect ...ADMIN: admin-dashbord
            //redirect ...NORMAL: normal-dashbord
            if(this.login.getUserRole() == 'ADMIN'){
              // admin dashbord
              //window.location.href="/admin"
              this.router.navigate(['admin'])
              this.login.loginStatusSubject.next(true);
            } else if (this.login.getUserRole() == 'NORMAL'){
              //noramal user dashbord
              //window.location.href="/user-dashbord"
              this.router.navigate(['user-dashbord/0']) 
              this.login.loginStatusSubject.next(true);

            }else
            {
              this.login.logout();
            }
          })}, 
      (error: any)=>{
        console.log('Error !');
        console.log(error);
        this.snak.open("Invalid Details !! Try agin",'',{
          duration: 3000,
        })
        

      }
    );

    }

}
