import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from './../../interfaces/products';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected to styleUrls
})
export class NavbarComponent implements OnInit {
  UserEmail: any;
  isLogin: boolean = false;
  searchValue:any
  AllProducts:Products[]=[];


  constructor(private _Router: Router,private _DataService: DataService) {}

  ngOnInit(): void {
    // Check if running in the browser environment
    if (typeof window !== 'undefined') {
      this.UserEmail = localStorage.getItem('logged');

      this.isLogin = this.UserEmail !== null;
    }

    this.GetAllProducts()

  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('logged');
      this._Router.navigate(['/login']);
    }
  }

  GetAllProducts() { 
    return this._DataService.GetAllProducts().subscribe((data) => {
     this.AllProducts=data
      console.log(this.AllProducts)
    });
  }
}
