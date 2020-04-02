import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { Options,LabelType } from 'ng5-slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HomeComponent>) { }

  ngOnInit() {
  }

  // ng-5 filter tray
  minValue: number = 100;
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
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
