import { SheetUpload } from './sheetUpload.service';
import { Injectable } from '@angular/core';

/*********************************Currently not being used */
@Injectable()

export class SheetCompare
{
    //Service Injection
    constructor(private sheetUploader:SheetUpload){}


    compareTwoSheets (invoice:File,itime:File){
        
    }
}