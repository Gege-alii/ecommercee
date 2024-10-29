import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
   isExist:boolean=false

  Users:any[]=[];

  constructor(private _Router:Router){
    const usersFromStorage = localStorage.getItem('users');

    if (usersFromStorage !== null) {
      this.Users = JSON.parse(usersFromStorage);
      console.log(this.Users);
    } else {
      this.Users = [];
    }
    

  }

  // Sign up Form and its validation
  SignUpForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required])
  })
// End of Sign up Form and its validation


 signUp(form:FormGroup){

// Check the array so that if the email is found, it will show the user that the email already exists and ask him to go to the login page. If the email does not exist, it will be added and the user will be taken to the login page.
    
for (let ele of this.Users) {
      if (ele.email === form.value.email) {
        this.isExist = true;
        console.log(this.isExist)

      } else {
        this.isExist = false;
        console.log(this.isExist)

      }
    }
    // Email is not found 
    if(this.isExist === false){
    this.Users.push(form.value)
    localStorage.setItem('users',JSON.stringify(this.Users))
    this._Router.navigate(['/login'])
    }else{
      // Email is found 
      this.isExist = true;
    }
  }



}
