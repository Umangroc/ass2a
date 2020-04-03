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

  changeitem(message: any) {
  this.itemSource.next(message)}

  //From Add to Cart Selection to hopping List
  private arrCartSource = new BehaviorSubject('None');
  currentArrCart = this.arrCartSource.asObservable();

  changeArrCart(message: any) {
  this.arrCartSource.next(message)
}

//Filtering
private filterSource = new BehaviorSubject('None');
currentFilter = this.filterSource.asObservable();

changeFilter(message: any) {
this.filterSource.next(message)
}
}
