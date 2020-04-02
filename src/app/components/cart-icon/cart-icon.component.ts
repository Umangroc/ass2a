import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  products: any; 
  show: any = false;
  // recieve = [];

  constructor(private dataSvc: DataService) { 
    this.products = [];
  }

  ngOnInit() {
    // console.log(this.products);
    
    this.dataSvc.currentitem.subscribe((res: any) => {
      if(res!="None"){
        this.show = true;
        this.products.push(res); 
        // localStorage.setItem("array", JSON.stringify(this.products));
        console.log("in CArt Component", this.products);
      }
      console.log(this.show);
    })
  }

  

}
