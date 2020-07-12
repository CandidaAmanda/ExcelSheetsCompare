import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SheetUpload } from './services/sheetUpload.service';
import { OutputGridComponent } from './output-grid/output-grid.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { UploadFormComponent } from './upload-form/upload-form.component';

@NgModule({
  declarations: [
    AppComponent,
    OutputGridComponent,
    AboutUsComponent,
    LoginComponent,
    UploadFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SheetUpload],
  bootstrap: [AppComponent]
})
export class AppModule { }
