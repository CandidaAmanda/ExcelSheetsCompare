import * as XLSX from 'xlsx';
import { BehaviorSubject } from 'rxjs';


export class SheetUpload
{
    //Identify if file is uploaded or not
    invoiceUploaded:boolean=false;
    iTimeUploaded:boolean=false;

    //Initialize Input file fields
    InvoiceSheet:File;
    ItimeSheet:File;

    EmployeeDetails ={
        psno:0,
        invSumStd:0.0,
        invSumOff:0.0,
        invSumOn:0.0,
        itSumStd:0.0,
        itSumOff:0.0,
        itSumOn:0.0,
        diff:false
    };
    EmpArray = new Array();

    mismatchCount=0;

    //File reader fields
    arrayBuffer:any;
    finalws1:XLSX.WorkSheet;
    finalws2:XLSX.WorkSheet;

    //Array of arrays storing data retreived from excel
    InvoiceDataArray:[][];
    ItimeDataArray:[][];

    //Observable

    //delete
    // private dataSource3= new BehaviorSubject(this.InvoiceDataArray);
    // currentData1=this.dataSource1.asObservable();

    // private dataSource2= new BehaviorSubject(this.ItimeDataArray);
    // currentData2=this.dataSource2.asObservable();
    //keep
    private dataSource1= new BehaviorSubject(this.EmpArray);
    currentData1=this.dataSource1.asObservable();

    // private dataSource2= new BehaviorSubject(this.mismatchCount);
    // currentData2=this.dataSource2.asObservable();

    constructor(){
       
    }




    uploadSheet(e:Event,fileType:String)
    {
        if ((<HTMLInputElement>e.target).files.length>0)
        {
            if (fileType=='in')
            {
                this.InvoiceSheet=(<HTMLInputElement>e.target).files[0];
                this.invoiceUploaded=true;
            }

            else if (fileType=='it')
            {
                this.ItimeSheet=(<HTMLInputElement>e.target).files[0];
                this.iTimeUploaded=true;
            }
        }

        else if ((<HTMLInputElement>e.target).files.length==0)
        {
            if (fileType=='in' && this.invoiceUploaded)
            {
                this.invoiceUploaded=false;
                this.InvoiceSheet=undefined;
            }

            if (fileType=='it' && this.iTimeUploaded)
            {
                this.iTimeUploaded=false;
                this.ItimeSheet=undefined;
            }
        }

    }

    validateUploadedSheets ()
    {
        if (this.invoiceUploaded==false)
        {
            alert('Kindly upload the Invoice Sheet');
        }

        else if(this.iTimeUploaded==false)
        {
            alert('Kindly upload the Itime Sheet');
        }

        else
        return true;
    }

    
    readFile()
    {

        const reader : FileReader= new FileReader();
        const reader2 : FileReader= new FileReader();

        reader.readAsArrayBuffer(this.InvoiceSheet);
        reader2.readAsArrayBuffer(this.ItimeSheet);

        let p1= new Promise ((resolve,reject)=>{
           reader.onload =  (e)  => {

            this.arrayBuffer = reader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            this.InvoiceDataArray = XLSX.utils.sheet_to_json(worksheet, {header:1});
            resolve('Success');
            }

        });

        
        let p2= new Promise((resolve,reject)=>{
            reader2.onload=(e:any)=>{
                this.arrayBuffer = reader2.result;
                var dat2 = new Uint8Array(this.arrayBuffer);
                var arr2 = new Array();
                for(var i = 0; i != dat2.length; ++i) arr2[i] = String.fromCharCode(dat2[i]);
                var bstr2 = arr2.join("");
                var workbook2 = XLSX.read(bstr2, {type:"binary"});
                var first_sheet_name2 = workbook2.SheetNames[0];
                var worksheet2 = workbook2.Sheets[first_sheet_name2];
                this.ItimeDataArray = XLSX.utils.sheet_to_json(worksheet2, {header:1});
                resolve('Success');
            };


        });


        p1.then(  (message)=>{
           //this.changeInvoiceData(this.InvoiceDataArray);
            p2.then (()=>{
                //this.changeItimeData(this.ItimeDataArray);
                this.displayFile();
            });
        });



    }

    //Observable
    
    // changeInvoiceData(data: any) {
    //     this.dataSource1.next(data);
    //   }

    // changeItimeData(data: any) {
    //     this.dataSource2.next(data);
    // }

    onChangeEmpArrayData (data:any){
        this.dataSource1.next(data);
    }

    // onChangeMismatchCount (data:any){
    //     this.dataSource2.next(data);
    // }


    displayFile()
    {
        // EmployeeDetails ={
        //     psno:0,
        //     invSumStd:0.0,
        //     invSumOff:0.0,
        //     invSumOn:0.0,
        //     itSumStd:0.0,
        //     itSumOff:0.0,
        //     itSumOn:0.0,
        //     diff:false
        // };
        // EmpArray:Object[];
        let q=0;
        let a=0,b=1,c=2,d=3;
        
        
        for(let i=0;i<this.InvoiceDataArray.length;i++)
        {   
            let dataAdded=false;
            this.EmployeeDetails.diff=false;
            if(typeof this.InvoiceDataArray[i][a] == 'number')
            {   
                this.EmployeeDetails.psno=this.InvoiceDataArray[i][a];
                this.EmployeeDetails.invSumStd=this.InvoiceDataArray[i][b];
                this.EmployeeDetails.invSumOff=this.InvoiceDataArray[i][c];
                this.EmployeeDetails.invSumOn=this.InvoiceDataArray[i][d];

                for (let j=0; j<this.ItimeDataArray.length;j++)
            {
                if ((this.InvoiceDataArray[i][a]===this.ItimeDataArray[j][a]))
                {   
                    this.EmployeeDetails.itSumStd=this.ItimeDataArray[j][b];
                    this.EmployeeDetails.itSumOff=this.ItimeDataArray[j][c];
                    this.EmployeeDetails.itSumOn=this.ItimeDataArray[j][d];
                    if(this.EmployeeDetails.invSumStd !=this.EmployeeDetails.itSumStd ||
                        this.EmployeeDetails.invSumOff != this.EmployeeDetails.itSumOff ||
                        this.EmployeeDetails.invSumOn != this.EmployeeDetails.itSumOn )
                    {
                        this.EmployeeDetails.diff=true;
                        this.mismatchCount++;
                    }
                   // console.log (this.EmployeeDetails);
                    this.EmpArray[q] = JSON.parse(JSON.stringify(this.EmployeeDetails));
                    //console.log(this.EmpArray);
                    dataAdded=true;
                    q++;
                }

                if(dataAdded)
                break;
            }

            }

            
           
        }

        console.log(this.EmpArray);
    }
}