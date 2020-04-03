import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/httpService/http.service';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit {

  lists: any;
  discountedPrice = [];
  i: number;
  view: any;
  sortedList: any;
  sortOption: string;
  sellprice: any;
  ind: any;
  indForCart: any;
  arr = [];
  arrForCart = [];
  max: any;
  min: any;

  constructor(private httpService:HttpService,private dataSvc: DataService) { }

  ngOnInit() {

    this.dataSvc.currentFilter.subscribe((res: any) => {
      console.log("Filter",res);
      if(res=="None"){
        this.max = 10000;
        this.min = 100;
      }else{
        this.min = res[0];
        this.max = res[1];
      } 
      console.log(this.min,this.max);
    });

    this.dataSvc.currentSortOption.subscribe((res: any) => {
      this.sortOption = res; 
  
      console.log("In Shopping List, Sort Option", res);
      this.dataSvc.changeDialogSortOption(this.sortOption);
      
      this.httpService.getList().subscribe((res:any)=>{
        this.lists=res;
        // console.log(this.lists);
        
        if(res.length>this.arr.length){
          for(this.i=0;this.i<res.length;this.i++){
            // console.log("dsd");
            this.sellprice = res[this.i].price * (1-(res[this.i].discount/100)); 
            // console.log("price", this.sellprice); 
            this.display(res[this.i].id, 
                        this.sellprice,
                        res[this.i].name,
                        res[this.i].price,
                        res[this.i].discount,
                        res[this.i].category,
                        res[this.i].img_url );
          }
        }
        
        this.sortByChoice(this.sortOption);
        console.log("price array", this.arr); 
      })
      
   })
  }

  display(id, sellingprice, name, originalprice, discount, category, url){
    this.ind = { itemId: id,
                 itemSellingPrice: sellingprice,
                 itemName: name,
                 itemOriginalPrice: originalprice,
                 itemDiscount: discount,
                 itemCategory: category,
                 itemUrl: url 
                };
    this.arr.push(this.ind);
  }

  // Sort Function
  sortByChoice(sortOption){    
   this.arr = this.filterlist(this.arr);
  if(sortOption=="high"){
    this.sortedList = this.arr.slice().sort((a, b) => b.itemSellingPrice - a.itemSellingPrice);
    console.log("Sorted List High", this.sortedList);
  }
  if(sortOption=="low"){
    this.sortedList = this.arr.slice().sort((a, b) => a.itemSellingPrice - b.itemSellingPrice);
    console.log("Sorted List Low", this.sortedList);
  }
  if(sortOption=="discount"){
    this.sortedList = this.arr.slice().sort((a, b) => b.itemDiscount - a.itemDiscount);
    console.log("Sorted List Discount", this.sortedList);
  }
  }

  // Filter Function
  filterlist(array) {    
    var lists = array.filter(function (item) {
      // console.log(this.min,this.max);
      return (item.itemSellingPrice >= 100 && item.itemSellingPrice <= 300);
    });
    console.log("Filtered",lists);
    
    return lists;
  }

  // Data to addToCart
  addtocart(item){
    console.log(item);
    this.displayInCart(item.itemId,
      item.itemSellingPrice,
      item.itemName,
      item.itemOriginalPrice,
      item.itemDiscount,
      item.itemCategory,
      item.itemUrl);
    this.dataSvc.changeitem(this.arrForCart);
  }

  displayInCart(id, sellingprice, name, originalprice, discount, category, url){
    this.indForCart = { itemId: id,
                 itemSellingPrice: sellingprice,
                 itemName: name,
                 itemOriginalPrice: originalprice,
                 itemDiscount: discount,
                 itemCategory: category,
                 itemUrl: url 
                };
    
    this.dataSvc.currentArrCart.subscribe((res: any) => {
      if(res!="None"){
        this.arrForCart = res;
      }
    
  }); 
    this.arrForCart.push(this.indForCart);
  }

}
