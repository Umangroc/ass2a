import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Options,LabelType } from 'ng5-slider';
import { SortComponent } from '../sort/sort.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // view: any = "high";
  values = [];
  a: number = 1;
  b: number = 0;
  c: number = 0;
  
  constructor(private dataSvc: DataService,public dialog: MatDialog) { }

  ngOnInit() {
    // this.sort(this.view);
    this.dataSvc.currentFilterSearchToHome.subscribe((res: any) => {
      console.log("res",res);
      if(res=="No Search"){
        this.minValue = 100 ;
        this.maxValue = 10000;
        this.a = 1;
        this.b = 0;
        this.c = 0;
      }
    });
  }

  // Desktop Sort
  sort(option){
    if(option=="high"){
      this.a = 1;
      this.b = 0;
      this.c = 0;
    }
    if(option=="low"){
      this.a = 0;
      this.b = 1;
      this.c = 0;
    }
    if(option=="discount"){
      this.a = 0;
      this.b = 0;
      this.c = 1;
    }
    this.dataSvc.changeSortOption(option);
  }

  // Mobile Sort Dialog
  openSortDialog(): void {
    const dialogRef = this.dialog.open(SortComponent, {
      width: '250px' , panelClass: 'custom-dialog-container' 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Sort dialog was closed');
    });
  }

  // Desktop Filter
  // ng-5 filter tray
  minValue: number = 100 ;
  maxValue: number = 10000;
  options: Options = {
    floor: 100,
    ceil: 10000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '₹' + value;
        case LabelType.High:
          return '₹' + value;
        default:
          return '₹' + value;
      }
    }
  };

  filter(){
    console.log(this.minValue,this.maxValue);
    this.values = [this.minValue,this.maxValue]
    this.dataSvc.changeFilter(this.values);
  }

  // Mobile Filter Dialog
  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '250px' , panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Filter dialog was closed');
    });
  }

}
