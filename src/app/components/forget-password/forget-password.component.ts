import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Users} from '../../interfaces/Users'
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit{
  isExist:boolean=false
  position:number=0
  Users:Users[]=[]

  constructor(private _Router:Router,@Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit():void{
    if (isPlatformBrowser(this.platformId)){
      const usersFromStorage = localStorage.getItem('users');
  
      if (usersFromStorage !== null) {
        this.Users = JSON.parse(usersFromStorage); // Now TypeScript knows it's a string
        console.log(this.Users);
      } else {
        this.Users = [];
      }
    
    }
  
  }


    // forget Password Form and its validation
    forgetPasswordForm:FormGroup=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required])

 })
  // End of forget Password Form and its validation

  forgetPassword(form:FormGroup){

    for (let ele of this.Users) {
      if (ele.email === form.value.email) {
        this.isExist = true;
        console.log(this.isExist)
        this.position=this.Users.indexOf(ele)


      } else {
        this.isExist = false;
        console.log(this.isExist)

      }
    }
    // Email is not found 
    if(this.isExist === false){
      console.log('Account is not exist')
    }else{
      // Email is found 
      this.isExist = true;
      this.Users[this.position].password=form.value.password
      localStorage.setItem('users',JSON.stringify(this.Users))
      Swal.fire({
        title: "Success",
        text: "Password is changed successfully",
        icon: "success"
      });
      this._Router.navigate(['/login'])
    
    }

  }

}
