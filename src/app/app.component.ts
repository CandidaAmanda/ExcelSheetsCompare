import { Component } from '@angular/core';

import * as XLSX from 'xlsx';
import { SheetUpload } from './services/sheetUpload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExcelCompare';

  //File reader fields
  arrayBuffer:any;
  filelist:any;
  
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
    console.log(this.fileType,a);
    this.sheetUploader.uploadSheet(a,this.fileType);
    this.fileType='';
    

  }

  
  compareSheets()
  {

    this.areBothFilesUploaded=this.sheetUploader.validateUploadedSheets();
    
    if (this.areBothFilesUploaded)
    {
      alert('Both files have been uploaded');
      //console.log(this.InvoiceSheet);
      //console.log(this.ItimeSheet);
      //pass files to a service

      let fileReader = new FileReader();    
      fileReader.readAsArrayBuffer(this.InvoiceSheet);
      fileReader.onload = (e) => {    
        this.arrayBuffer = fileReader.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
        var bstr = arr.join("");    
        var workbook = XLSX.read(bstr, {type:"binary"});    
        var first_sheet_name = workbook.SheetNames[0];    
        var worksheet = workbook.Sheets[first_sheet_name];    
        //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
          var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
              this.filelist = [];    
              console.log(this.filelist); 
              
              
      }
      
     
    }
  }
}
