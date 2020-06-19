import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SheetUpload } from './services/sheetUpload.service';
import { SheetCompare } from './services/sheetCompare.service';
import { OutputGridComponent } from './output-grid/output-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    OutputGridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SheetUpload,SheetCompare],
  bootstrap: [AppComponent]
})
export class AppModule { }
