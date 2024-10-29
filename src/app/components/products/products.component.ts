import { Component ,OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Products } from '../../interfaces/products';
import { AddToCart } from '../../commonFunctions';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  AllProducts:Products[]=[];


  constructor(private _DataService:DataService){}

  ngOnInit(): void {
    this.GetAllProducts(); 
  }

  GetAllProducts() { 
    return this._DataService.GetAllProducts().subscribe((data) => {
      this.AllProducts=data
      console.log(this.AllProducts)
    });
  }

  AddToCartt(product:any){
    AddToCart(product,1)

  }
}
