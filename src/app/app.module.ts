import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SheetUpload } from './services/sheetUpload.service';
import { SheetCompare } from './services/sheetCompare.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SheetUpload,SheetCompare],
  bootstrap: [AppComponent]
})
export class AppModule { }
