import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private userService:UserService, private snak:MatSnackBar  ) { }

  public user ={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  }
  ngOnInit(): void {}


  formSubmit(){
  
    if(this.user.username ==  '' ||  this.user.username == null){
      //  alert('User is Required !!');
      this.snak.open('User is Required !!','',{
        duration: 3000, 
        //verticalPosition: 'top', horizontalPosition: 'start'
      });
       return;
    }
    // if(this.user.firstname ==  '' ||  this.user.firstname == null){
    //   alert('Firstname is Required !!');
    //   return;
    // }

    //adduser : UserService 

    this.userService.addUser(this.user).subscribe(
      (data:any) =>{
        //sucess
        console.log(data);
        // alert('Sucess');
        Swal.fire('Successfully done !!', 'User id is' + data.id, 'success')
      },
      (error) =>{
        //error
        console.log(error)
        // alert('Something went wrong');  User with this Username is already there in DB !! try with another one
        this.snak.open(error.error.text, '',{
          duration: 5000,
        })
      }
    )
  }
}
