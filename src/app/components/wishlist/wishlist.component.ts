import { Component , OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Products } from './../../interfaces/products';
import { DataService } from '../../services/data.service';
import { AddToCart } from '../../commonFunctions';
import Swal from "sweetalert2";



@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
wishlist:any;
Items:Products[]=[]
userWishlist: any[] = [];
position:any;
userLogged:any;
positionn:any;
constructor(private _DataService:DataService){   
  this.userLogged = typeof window !== 'undefined' ? localStorage.getItem('logged') : null;
   
}
ngOnInit():void{

  if (typeof window !== 'undefined') {
    const storedwishlist = localStorage.getItem('wishlist');
    this.wishlist = storedwishlist ? JSON.parse(storedwishlist) : [];

    for (let product of this.wishlist) {
      if (product.user === this.userLogged) {
        this.userWishlist.push(product);
      }
    }
    console.log(this.userWishlist);
    localStorage.setItem('UserWishlist', JSON.stringify(this.userWishlist));
    this.getRelatedItems()

 
  }


  }

 // Add to cart
 AddToCartt(product:any){
  AddToCart(product,1)

}
// function to get the stars of the product
get(x: any) {
  const fullStars = Math.floor(x);
  return Array(fullStars).fill(0);
}

 // This function is used to get the products that are related to the product that the user wanted to see (depending on the category of the product). 
 getRelatedItems(){
  return this._DataService.GetAllProducts().subscribe((data)=>{
    this.Items=data
  })
 }

 // This function is used to delete a specific product from the wishlist 
 deleteFromWishlist(product:any){


  if (typeof window !== 'undefined') {
    let exist = false;

    for (let element of this.userWishlist) {
      if (element.id === product.id) {
        exist = true;
        this.position = this.userWishlist.indexOf(element);
        break;
      }
    }
    for (let element of this.wishlist) {
      if (element.id === product.id) {
        exist = true;
        this.positionn = this.wishlist.indexOf(element);
        break;
      }
    }
    if (exist) {
      this.userWishlist.splice(this.position, 1);
      this.wishlist.splice(this.positionn,1)
      localStorage.setItem('UserWishlist', JSON.stringify(this.userWishlist));
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));

      Swal.fire({
        title: 'Success',
        text: 'Your product has been successfully removed from your wishlist.',
        icon: 'success',
      });
    }
  }

  }
  
 
 // This function is used to add all of the products in the wishlist to the cart , then delete all the products from the wishlist
 MoveTobag(){
  for(let element of this.wishlist){
    AddToCart(element,1)
  }
  Swal.fire({
    title: "Your products are added successfully to your cart",
    text: "But if the product is available in the cart, we will increase its quantity, and if it is not available, we will add it.",
    icon: "success",
  });

  // Remove all the products from wishlist
  this.wishlist.splice(0, this.wishlist.length);
  localStorage.setItem('wishlist',JSON.stringify(this.wishlist))
 }
 
 
 
 
 customOptions: OwlOptions = {
  loop: true,
  margin:30,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 700,
  navText: [ "","" ],
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
      items: 4
    }
  },
  nav: false
}
 
}

