import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/httpService/http.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { SearchPipe } from 'src/app/pipe/search/search.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  filteredRecords:any;
  filterpipe: SearchPipe = new SearchPipe;
  searchItem: any;
  flag: boolean = true;


  constructor(private httpService:HttpService,private dataSvc: DataService,private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.dataSvc.currentSearch.subscribe((res: any) => {
      this.searchItem = res;
      console.log("Search",this.searchItem);

      this.dataSvc.currentFilter.subscribe((res: any) => {
        console.log("Filter",res);
        if(res=="None"){
          this.max = 10000;
          this.min = 100;
        }else{
          this.min = res[0];
          this.max = res[1];
        } 
        // console.log(this.min,this.max);

        // Send Data to Filter Dialog
        this.dataSvc.changeFilterDialog([this.min,this.max]);
    
        // SortOption coming from both home and sort component
        this.dataSvc.currentSortOption.subscribe((res: any) => {
          if(res == "Default High to Low"){
            this.sortOption = "high";
          }else{
            this.sortOption = res;
          }
          console.log("In Shopping List, Sort Option", res);
          
          // Send Data to Sort Dialog
          this.dataSvc.changeDialogSortOption(this.sortOption);
            
          // Data From JSON
          this.httpService.getList().subscribe((res:any)=>{        
            // Making New Data inclusive of Selling Price
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
      });
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
   var array = this.filterlist(this.arr);
  if(sortOption=="high"){
    this.sortedList = array.slice().sort((a, b) => b.itemSellingPrice - a.itemSellingPrice);
    console.log("Sorted List High", this.sortedList);
  }
  if(sortOption=="low"){
    this.sortedList = array.slice().sort((a, b) => a.itemSellingPrice - b.itemSellingPrice);
    console.log("Sorted List Low", this.sortedList);
  }
  if(sortOption=="discount"){
    this.sortedList = array.slice().sort((a, b) => b.itemDiscount - a.itemDiscount);
    console.log("Sorted List Discount", this.sortedList);
  }
  }

  // Filter Function
  filterlist(array) {  
    this.filteredRecords=this.filterpipe.transform(array,this.searchItem);
    // console.log("Search Array", this.filteredRecords);
    
    var hi = this.max;
    var lo = this.min;  
    var lists = this.filteredRecords.filter(function (item) {
      // console.log(this.min,this.max);
      return (item.itemSellingPrice >= lo && item.itemSellingPrice <= hi);
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
    this.dataSvc.changeBadge(this.arrForCart.length)
  }

  displayInCart(id, sellingprice, name, originalprice, discount, category, url){
    this.indForCart = { itemId: id,
                 itemSellingPrice: sellingprice,
                 itemName: name,
                 itemOriginalPrice: originalprice,
                 itemDiscount: discount,
                 itemCategory: category,
                 itemUrl: url,
                 itemNumber: 1 
                };
    
    this.dataSvc.currentArrCart.subscribe((res: any) => {
      if(res!="None"){
        this.arrForCart = res;
      }
    }); 

    console.log("array for cart",this.arrForCart);
    for(this.i=0;this.i < this.arrForCart.length;this.i++){
      if(this.arrForCart[this.i].itemId==id){
        this.flag = false;
        break;
      }
    }
    
    if(this.flag){
      this.flag = true;
      this.arrForCart.push(this.indForCart);
      this._snackBar.open("Added to Cart", "", {
        duration: 2000,
      });
    }else{
      this.flag = true;
      this._snackBar.open("Already in Cart", "", {
        duration: 2000,
      });
    }
    
  }

}
