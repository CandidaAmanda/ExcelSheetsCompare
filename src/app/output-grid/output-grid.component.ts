import { Component, Input } from "@angular/core";
import { SheetUpload } from '../services/sheetUpload.service';


@Component({

    selector:'output-grid',
    templateUrl:'./output-grid.component.html',
    styleUrls:['output-grid.component.css']
   

})
export class OutputGridComponent{

    @Input() displayGrid: boolean=false;
    

    InvoiceData:[][];
    ItimeData:[][];
    differenceCount=0;

    EmpArray = new Array();

    constructor(private sheetService:SheetUpload){};


    
    ngOnInit(){
        //Subscribe temp
        // this.sheetService.currentData1.subscribe(data => this.InvoiceData=data);
        // this.sheetService.currentData2.subscribe(data => this.ItimeData=data);

        //Actual subscription
        this.sheetService.currentData1.subscribe(data => this.EmpArray=data);
        //this.sheetService.currentData2.subscribe(data => this.differenceCount);
    }

   
}