import { Component, AfterViewInit  } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from '../../services/data.service';
import { Products } from './../../interfaces/products';
import { AddToWishList ,AddToCart} from '../../commonFunctions';
import $ from "jquery";
import { Categories } from './../../interfaces/categories';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class HomeComponent implements AfterViewInit  {
   AllProducts:Products[]=[];
  FourProducts:Products[]=[];
  CustomCategories:Categories[]=[
    {icon:'fa-solid fa-computer',name:'Electronics',link:'/categories/electronics'},
    {icon:'fa-regular fa-gem',name:'Jewelery',link:'/categories/jewelery'},
    {icon:'fa-solid fa-mars',name:"Men's Clothing",link:"/categories/men's clothing"},
    {icon:'fa-solid fa-venus',name:"Women's Clothing",link:"/categories/women's clothing"},
    {icon:'fa-solid fa-mobile-screen',name:'Phones',link:'/categories'},
    {icon:'fa-solid fa-laptop',name:'Computers',link:'/categories'},
    {icon:'fa-regular fa-clock',name:'SmartWatch',link:'/categories'},
    {icon:'fa-solid fa-camera',name:'Camera',link:'/categories'},
    {icon:'fa-solid fa-headphones',name:'HeadPhones',link:'/categories'},
    {icon:'fa-solid fa-gamepad',name:'Gaming',link:'/categories'}

  ]

  constructor(private _DataService: DataService) {
  }

  ngAfterViewInit () {
  this.GetAllProducts()

   /* The arrow appears after it passes the navigation bar */
   $(window).scroll(function() {
    let windowScroll = $(window).scrollTop();
  
    if (windowScroll && windowScroll > 1000) { 
      $('#fixed-arrow').show(1000);
    } else {
      $('#fixed-arrow').hide(1000);
    }
  });
  
  $('#fixed-arrow').click(function() {
    $('html').animate({
      scrollTop: 0
    }, 1000);
  });
  

   
  }
  

  GetAllProducts() { 
    return this._DataService.GetAllProducts().subscribe((data) => {
     this.AllProducts=data
      this.FourProducts=data.splice(4,4)
    });

  }

  // Add To Wishlist
  AddToWishListt(product:any){

    AddToWishList(product)
      }

      // Add to Cart
      AddToCartt(product:any){
        AddToCart(product,1)
    
      }

      // Get the yellow stars
  get(x:any){
    const fullStars = Math.floor(x)
    return Array(fullStars).fill(0)
  }

  customOptions: OwlOptions = {
    loop: true,
    margin:30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [ 
      '<i class="fa-solid fa-arrow-left p-2 fs-5  text-black"></i>',
       // Custom left arrow
      '<i class="fa-solid fa-arrow-right p-2 fs-5  text-black "></i>'  // Custom right arrow
      ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4.5
      }
    },
    nav: true
  }


  customOptionss: OwlOptions = {
    loop: true,
    margin:30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [ 
      '<i class="fa-solid fa-arrow-left p-2 fs-5  text-black"></i>',
       // Custom left arrow
      '<i class="fa-solid fa-arrow-right p-2 fs-5  text-black "></i>'  // Custom right arrow
      ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }


 

 
}
