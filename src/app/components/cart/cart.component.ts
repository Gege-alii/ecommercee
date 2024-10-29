import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Changes } from './../../interfaces/changes';
import { Cart } from './../../interfaces/cart';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] // Corrected to styleUrls
})
export class CartComponent implements OnInit {
  cart: any;
  position: any;
  valuee:any;
  positionn: any;

  userCart: Cart[] = [];
  userLogged: string | null;
  total:number=0;
  changes:Changes[]=[]
  UserCartt: Cart[] = [];

  constructor() {
    // Check if running in the browser environment
    this.userLogged = typeof window !== 'undefined' ? localStorage.getItem('logged') : null;


  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');

      this.cart = storedCart ? JSON.parse(storedCart) : [];

      for(let product of this.cart){
        if (product.user === this.userLogged) {
          this.UserCartt.push(product);
        }
      }
      localStorage.setItem('Usertcart', JSON.stringify(this.UserCartt));

      const storedCartt = localStorage.getItem('Usertcart');
if (storedCartt !== null) {
  this.UserCartt = JSON.parse(storedCartt) as Cart[];
  console.log(this.UserCartt)
} else {
  this.UserCartt = []; // Set it to an empty array if no data is found
}





  for(let product of this.UserCartt){
    this.total += (product.price * product.quantity)
  }

  } 
}
  onQuantityChange(slide: any) {

    let x={
      quantity:slide.quantity,
      id:slide.id
    }
    this.changes.push(x)

    // Add further logic to handle the quantity change
  }
  // Function to delete a specific product from the Cart
  deleteFromCart(product: any) {
    if (typeof window !== 'undefined') {
      let exist = false;

      for (let element of this.userCart) {
        if (element.id === product.id) {
          exist = true;
          this.position = this.userCart.indexOf(element);
          break;
        }
      }
      for (let element of this.cart) {
        if (element.id === product.id) {
          exist = true;
          this.positionn = this.cart.indexOf(element);
          break;
        }
      }
      if (exist) {
        this.userCart.splice(this.position, 1);
        this.cart.splice(this.positionn,1)
        localStorage.setItem('Usertcart', JSON.stringify(this.userCart));
        localStorage.setItem('cart', JSON.stringify(this.cart));

        Swal.fire({
          title: 'Success',
          text: 'Your product has been successfully removed from your cart.',
          icon: 'success',
        });
      }
    }
  }

   update(){
    console.log(this.changes)
    console.log(this.UserCartt)  

 for(let product_cart of this.UserCartt){
  for(let change of this.changes){
    if(product_cart.id === change.id){
      
      product_cart.quantity=change.quantity
      console.log(this.cart.indexOf(product_cart))
      this.cart[this.UserCartt.indexOf(product_cart)].quantity=change.quantity
      console.log(this.cart[this.UserCartt.indexOf(product_cart)].quantity)
      localStorage.setItem('Usertcart', JSON.stringify(this.UserCartt));
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }
 }
  console.log(this.UserCartt)
  console.log(this.cart)

  localStorage.setItem('Usertcart', JSON.stringify(this.UserCartt));

  this.UserCartt=JSON.parse(localStorage.getItem('Usertcart')!) 
    

  } 



/*   update() {
    console.log(this.changes);
    console.log(this.UserCartt);  // Initial quantities

    // Create a Map for changes by id
    const changesMap = new Map(this.changes.map(item => [item.id, item.quantity]));

    // Loop through UserCartt and update quantities if there's a match in changes
    this.UserCartt.forEach((item, index) => {
        const newQuantity = changesMap.get(item.id) ?? item.quantity;  // Use current quantity if undefined
        item.quantity = newQuantity;
        this.cart[index].quantity = newQuantity;
        console
    });

    console.log(this.UserCartt);

    // Persist the updated cart in localStorage
    localStorage.setItem('Usertcart', JSON.stringify(this.UserCartt));
} */

// Load the cart from localStorage when the component initializes
loadCart() {
    const savedCart = localStorage.getItem('Usertcart');
    if (savedCart) {
        this.UserCartt = JSON.parse(savedCart);
    }
}


}
