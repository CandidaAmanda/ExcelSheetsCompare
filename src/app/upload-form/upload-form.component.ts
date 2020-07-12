import { Component, OnInit } from '@angular/core';
import { SheetUpload } from '../services/sheetUpload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
//Service Injection
constructor(private sheetUploader:SheetUpload){}

  ngOnInit(): void {
  }

  fileType:String='';

  //flag to identify if both sheets have been successfully uploaded
  areBothFilesUploaded:Boolean=false;

  displayGrid=false;

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
 
      this.sheetUploader.readFile();  
      this.displayGrid=true;
      //this.sheetUploader.displayFile(); 
    }

    // else
    // {
    //   alert ('One or more input files are missing');
    // }
      
     
  }

}
