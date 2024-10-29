import { Component ,OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})

export class CategoriesComponent implements OnInit{

  AllCategories:any[]=[];


  constructor(private _DataService:DataService){}

  ngOnInit(): void {
    this.GetAllCategories(); 
  }

  GetAllCategories(){
    return this._DataService.GetAllCategories().subscribe(
      (data)=>{
        console.log(data)
     
        this.AllCategories=data
      }

  
  )
  }

}
