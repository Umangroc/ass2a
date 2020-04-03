import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { FilterComponent } from './components/filter/filter.component';
import { SortComponent } from './components/sort/sort.component';
import { Ng5SliderModule } from 'ng5-slider';
import { SearchPipe } from './pipe/search/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    HomeComponent,
    HeaderComponent,
    CartIconComponent,
    FilterComponent,
    SortComponent,
    SearchPipe
  ],
  entryComponents: [FilterComponent,SortComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng5SliderModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSliderModule,
    NouisliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
