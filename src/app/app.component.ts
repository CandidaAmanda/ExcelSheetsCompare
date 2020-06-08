import { Component } from '@angular/core';


import { SheetUpload } from './services/sheetUpload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExcelCompare';
  //Service Injection
  constructor(private sheetUploader:SheetUpload){}

  //Type of file
  //in=invoice, it: itime
  fileType:String='';

  //flag to identify if both sheets have been successfully uploaded
  areBothFilesUploaded:Boolean=false;

  /******************************************************************************************************
   * Functionality begins here
   * ***************************************************************************************************/

  uploadedInvoiceSheet(a:Event)
  {
    this.fileType='in';
    this.sheetUploader.uploadSheet(a,this.fileType);
    this.fileType='';
  }


  uploadedItimeSheet(a:Event)
  {
    this.fileType='it';
    this.sheetUploader.uploadSheet(a,this.fileType);
    this.fileType='';
  }

  
  compareSheets()
  {
    this.areBothFilesUploaded=this.sheetUploader.validateUploadedSheets();
    if (this.areBothFilesUploaded)
    {
      alert('Both files have been uploaded');
      this.sheetUploader.parseSheets();
      this.sheetUploader.compareTwoSheets();     
    }

    else
    {
      alert ('One or more input files are missing');
    }
      
     
  }
}

