import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SortComponent } from '../sort/sort.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  view: any = "high";
  
  constructor(private dataSvc: DataService,public dialog: MatDialog) { }

  ngOnInit() {
    this.sort(this.view);
  }

  sort(option){
    this.view = option;
    this.dataSvc.changeSortOption(this.view);
  }

  openSortDialog(): void {
    const dialogRef = this.dialog.open(SortComponent, {
      width: '250px' , panelClass: 'custom-dialog-container' 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Sort dialog was closed');
    });
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '250px' , panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Filter dialog was closed');
    });
  }

}
