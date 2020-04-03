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
  recieve = [];

  constructor(private dataSvc: DataService) { 
  }

  ngOnInit() {
    
    this.dataSvc.currentitem.subscribe((res: any) => {
      if(res!="None"){
        this.show = true;
        this.recieve = res;
        this.dataSvc.changeArrCart(res);
        console.log("in CArt Component", this.recieve);
      }
      console.log(this.show);
    })
  }

  

}
