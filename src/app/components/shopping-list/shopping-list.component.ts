import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/httpService/http.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { User } from 'src/app/discount.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit {

  user: User;
  lists: any;
  discountedPrice = [];
  i: number;
  view: any;
  sortedList: any;
  sortOption: string;

  constructor(private httpService:HttpService,private dataSvc: DataService) { }

  ngOnInit() {
    this.dataSvc.currentSortOption.subscribe((res: any) => {
      this.sortOption = res; 
      console.log("In Shopping List, Sort Option", res);
      this.dataSvc.changeDialogSortOption(this.sortOption);
      
      this.httpService.getList().subscribe((res:any)=>{
        this.lists=res;
  
        this.sortByChoice(this.sortOption);
        
        for(this.i=0;this.i<res.length;this.i++){
          // console.log("dsd");
          // this.user.id[this.i] = res[this.i].id;
          // this.userTestStatus[this.i].sellprice = res[this.i].price;
          // this.user.price = res[this.i].price * (1-(res[this.i].discount/100)); 
          // console.log("price", this.discountedPrice[this.i]); 
        }
        
        // console.log("price", this.user); 
      })
      
   })
  }

  // Sort Function
  sortByChoice(sortOption){
  if(sortOption=="high"){
    this.sortedList = this.lists.slice().sort((a, b) => b.price - a.price);
    console.log("Sorted List High", this.sortedList);
  }
  if(sortOption=="low"){
    this.sortedList = this.lists.slice().sort((a, b) => a.price - b.price);
    console.log("Sorted List Low", this.sortedList);
  }
  if(sortOption=="discount"){
    this.sortedList = this.lists.slice().sort((a, b) => b.discount - a.discount);
    console.log("Sorted List Discount", this.sortedList);
  }
  }

  addtocart(item){
    console.log(item);
    localStorage.setItem("names", JSON.stringify(item));
    this.dataSvc.changeitem(item);
  }

}
