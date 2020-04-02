import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor() { }

  // Sort Option Selection to Shopping List
  private sortOptionSource = new BehaviorSubject('Default High to Low');
  currentSortOption = this.sortOptionSource.asObservable();

  changeSortOption(message: string) {
  this.sortOptionSource.next(message);}

   // Sort Option Selection to Sort Dialog List
   private sortDialogToSource = new BehaviorSubject('Default High to Low');
   currentDialogSortOption = this.sortDialogToSource.asObservable();
 
   changeDialogSortOption(message: string) {
   this.sortDialogToSource.next(message);}

  // Add to Cart Selection
  private itemSource = new BehaviorSubject('None');
  currentitem = this.itemSource.asObservable();

  changeitem(message: string) {
  this.itemSource.next(message)
}
}
