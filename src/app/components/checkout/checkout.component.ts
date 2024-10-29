import { Component ,OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  Usercart: any;
  total: number=0;

  // localStorage.getItem('Usercart')

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('Usertcart');
      this.Usercart = storedCart ? JSON.parse(storedCart) : [];
      console.log(this.Usercart)


      for(let product of this.Usercart){
        this.total += (product.price * product.quantity)
      }
    }



  }

}
