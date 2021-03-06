import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { Options,LabelType } from 'ng5-slider';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  values = [];
  minValue: number;
  maxValue: number;

  constructor(public dialogRef: MatDialogRef<HomeComponent>,private dataSvc: DataService) { }

  ngOnInit() {
    this.dataSvc.currentFilterDialog.subscribe((res: any) => {
      console.log("Filter Values in Filter Dialog",res);
      this.minValue = res[0];
      this.maxValue = res[1];
    });
  }

  // ng-5 filter tray
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
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
