import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  products: any; 
  show: any = false;
  recieve = [];
  index: number;
  NumberOfItem: number;
  totalSum: number;
  totalDiscount: number;
  totalPayment: number;

  constructor(private dataSvc: DataService, private _snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    
    this.dataSvc.currentitem.subscribe((res: any) => {
      if(res!="None"){
        this.show = true;
        this.recieve = res;
        this.dataSvc.changeArrCart(res);
        console.log("in CArt Component", this.recieve);
        this.calculation();
        
      }
      console.log(this.show);
    })
  }

  remove(product){
    // console.log(product);
    this.index = this.recieve.findIndex(i => i.itemId === product.itemId);
    this.recieve.splice(this.index, 1);
    this.dataSvc.changeBadge(this.recieve.length);
    if(!this.recieve.length){
      this.show = false;
    }
  }

  plus(product){
    this.index = this.recieve.findIndex(i => i.itemId === product.itemId);
    this.recieve[this.index].itemNumber++;
    console.log(this.recieve[this.index]); 
    this.calculation();
  }

  minus(product){
    this.index = this.recieve.findIndex(i => i.itemId === product.itemId);
    if(this.recieve[this.index].itemNumber > 1){
      this.recieve[this.index].itemNumber--;
      this.calculation();
    }
    else{
      this._snackBar.open("Not Possible, click remove to delete this item.", "", {
        duration: 2000,
      });
    }
    // console.log(this.recieve[this.index]); 
    
  }

  // Cart Values
  calculation(){
    this.totalSum = 0;
    this.totalDiscount = 0;
    this.NumberOfItem = this.recieve.length;
    for(var i=0;i < this.NumberOfItem;i++){
      this.totalSum += this.recieve[i].itemOriginalPrice * this.recieve[i].itemNumber;
      this.totalDiscount += (this.recieve[i].itemOriginalPrice * this.recieve[i].itemDiscount/100) * this.recieve[i].itemNumber 
    }
    this.totalPayment = this.totalSum - this.totalDiscount;
  }
  
  // Header Icon
  refresh(){
    this.dataSvc.changeSearch("No Search");
    this.dataSvc.changeFilter("None");
    this.dataSvc.changeSortOption("Default High to Low");
  }

}
