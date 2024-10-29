import { Component,OnInit , Inject, PLATFORM_ID} from '@angular/core';
import { DataService } from '../../services/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Products } from './../../interfaces/products';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AddToWishList ,AddToCart} from '../../commonFunctions';


@Component({
  selector: 'app-show-one-product',
  templateUrl: './show-one-product.component.html',
  styleUrl: './show-one-product.component.css'
})

export class ShowOneProductComponent implements OnInit{
  position:any;
  cart:any;
  product:any;
  wishlist:any;
  productId:any;
  RelatedItems:Products[]=[]
  inputValue:number=1;
  constructor(private _DataService:DataService,private _Router:Router,
    @Inject(PLATFORM_ID) private platformId: Object,private _ActivatedRoute:ActivatedRoute){

    if (isPlatformBrowser(this.platformId)) {
      const cartItem = localStorage.getItem('cart');
      this.cart = cartItem ? JSON.parse(cartItem) : [];

      const wishListItem = localStorage.getItem('wishlist');
      this.wishlist = wishListItem ? JSON.parse(wishListItem) : [];
  } else {
      this.wishlist = []; 
      this.cart=[];
  }
  }
  
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      console.log(this.productId)
      this.ShowOneProduct(this.productId)
  });
  }


  // This function is used to fetch the data from the API to show one product that the user wanted to see.
  ShowOneProduct(productId:number){
    return this._DataService.GetOneProduct(productId).subscribe((data)=>{
      this.product=data
      this.getRelatedItems(data.category)
    })
  }


// function to get the stars of the product
get(x: any) {
  const fullStars = Math.floor(x);
  return Array(fullStars).fill(0);
}

  AddToCartt(product:any,inn:number){
    AddToCart(product,inn)

  }

  AddToWishListt(product:any){

AddToWishList(product)
  }
 // This function is used to get the products that are related to the product that the user wanted to see (depending on the category of the product). 
 getRelatedItems(category:string){
  return this._DataService.GetOneCategory(category).subscribe((data)=>{
    this.RelatedItems=data
  })
 }

 increase(){
  this.inputValue +=1
 }

 decrease(){
  if(this.inputValue == 1 ){
    this.inputValue=1
  }else{
    this.inputValue -=1
  }
 }

 show(id:number){
  this._Router.navigate(['/product', id]);
  window.scroll(0,0)
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
