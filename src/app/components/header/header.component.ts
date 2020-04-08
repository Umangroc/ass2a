import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchText: any;
  badgeValue: any;
  show: boolean;
  showSearch: boolean = false;

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    this.dataSvc.currentBadge.subscribe((res: any) => {
      console.log("badge value",res);
      if(res == 0){
        this.show = false;
      }else{
        this.show = true;
        this.badgeValue = res;
      }
    })
  }

  search(){
    this.dataSvc.changeSearch(this.searchText);
    this.dataSvc.changeFilter("None");
    this.dataSvc.changeSortOption("Default High to Low");
    this.dataSvc.changeFilterSearchToHome("No Search");
    this.searchText ="";
    this.showSearch = false;
  }

  refresh(){
    this.dataSvc.changeSearch("No Search");
    this.dataSvc.changeFilter("None");
    this.dataSvc.changeSortOption("Default High to Low");
  }

  toggle(){
    this.showSearch = true;
  }
}
