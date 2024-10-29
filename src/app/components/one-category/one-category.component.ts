import { Component ,OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Products } from './../../interfaces/products';
import { ActivatedRoute } from '@angular/router';
import { AddToCart } from '../../commonFunctions';



@Component({
  selector: 'app-one-category',
  templateUrl: './one-category.component.html',
  styleUrl: './one-category.component.css'
})
export class OneCategoryComponent implements OnInit{

OneCategory:Products[]=[]
category:any;

  constructor(private _DataService:DataService,private _ActivatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.category = params.get('cat');
      console.log( this.category);
    });
    this.GetOneCategory(this.category)
    
  }

  GetOneCategory(category:string){
    return this._DataService.GetOneCategory(category).subscribe(
      (data)=>{
        this.OneCategory=data
        console.log(this.OneCategory)

     
      }

  
  )
  }
  AddToCartt(product:any){
    AddToCart(product,1)

  }


}
