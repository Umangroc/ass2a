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

  // Filtering
  private filterSource = new BehaviorSubject('None');
  currentFilter = this.filterSource.asObservable();

  changeFilter(message: any) {
  this.filterSource.next(message)
  }

    // Filtering Value to Filter Dialog List
    private filterDialogToSource = new BehaviorSubject('None');
    currentFilterDialog = this.filterDialogToSource.asObservable();

    changeFilterDialog(message: any) {
    this.filterDialogToSource.next(message)
    }

    // Filtering Value from Header Search to Filter Home Desktop List
    private filterSearchToHomeSource = new BehaviorSubject('None');
    currentFilterSearchToHome = this.filterSearchToHomeSource.asObservable();

    changeFilterSearchToHome(message: any) {
    this.filterSearchToHomeSource.next(message)
    }
  
  // Searching
  private searchSource = new BehaviorSubject('No Search');
  currentSearch = this.searchSource.asObservable();

  changeSearch(message: any) {
  this.searchSource.next(message)
  }

  // Icon Badge
  private badgeSource = new BehaviorSubject('0');
  currentBadge = this.badgeSource.asObservable();

  changeBadge(message: any) {
  this.badgeSource.next(message)
  }
}
