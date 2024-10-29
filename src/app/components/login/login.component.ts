import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isExist:boolean=true;
  Matched:boolean=true;

  Users:any[]=[]
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
  
  // Login Form and its validation
  LoginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required])
  })
// End of Login Form and its validation

  Login(form:FormGroup){

    // Check the array so that if the email is not found, it will show the user that the email is not exist and ask him to go to the sign up page. If the email is exist,  the user will be taken to the Home page.
        
    for (let ele of this.Users) {

          if (ele.email === form.value.email) {

            if(ele.password===form.value.password){
              this.isExist = true;
            }else{
              this.Matched=false
              this.isExist = true;
            }
    
          } else {
            this.isExist = false;
             
          }
        }
        // Email is found 
        if(this.isExist && this.Matched){
          localStorage.setItem('logged',form.value.email)
        this._Router.navigate(['/home'])
        }else if(!this.isExist){
          // Email is not found 
          this.isExist= false;
          
        }else if(!this.Matched){
          this.Matched=false
          this.isExist = true;
        }
   }
    

    
}
