import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';
import { HomeComponent } from '../home/home.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  selectValue: string = 'Price -- High Low';
  sortOptions: string[] = ['Price -- High Low', 'Price -- Low High', 'Discount'];
  sortChoice: string;
  recieveValue: string;

  constructor(private dataSvc: DataService, public dialogRef: MatDialogRef<HomeComponent>) { }

  ngOnInit() {
    // Recieving Sort Option for default from Shopping List
    this.dataSvc.currentSortOption.subscribe((res: any) => {
      this.recieveValue = res;
      if(this.recieveValue=="high"){
        this.selectValue = "Price -- High Low";
      }
      if(this.recieveValue=="low"){
        this.selectValue = "Price -- Low High";
      }
      if(this.recieveValue=="discount"){
        this.selectValue = "Discount";
      }
      // console.log(this.recieveValue);
      // console.log(this.selectValue);
    });
      
  }

  sort(option){
    console.log("What you have selected",option);
    if(option=="Price -- High Low"){
      this.sortChoice = "high";
    }
    if(option=="Price -- Low High"){
      this.sortChoice = "low";
    }
    if(option=="Discount"){
      this.sortChoice = "discount";
    }
    this.dataSvc.changeSortOption(this.sortChoice);
    this.dialogRef.close();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
