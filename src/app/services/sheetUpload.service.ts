import * as XLSX from 'xlsx';


export class SheetUpload
{
    //Identify if file is uploaded or not
    invoiceUploaded:boolean=false;
    iTimeUploaded:boolean=false;

    //Initialize Input file fields
    InvoiceSheet:File;
    ItimeSheet:File;

    invoiceObject:any;
    itimeObject:any;

    //File reader fields
    arrayBuffer:any;
    finalws1:XLSX.WorkSheet;
    finalws2:XLSX.WorkSheet;

    //temp, to be deleted
    data1:[][];
    data2:[][];


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
            this.data1 = XLSX.utils.sheet_to_json(worksheet, {header:1});
            //console.log(this.data1);
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
                this.data2 = XLSX.utils.sheet_to_json(worksheet2, {header:1});
                //console.log(this.data2);
                resolve('Success');
            };


        });


        p1.then(  (message)=>{
            console.log('Promis1:'+message);
           // this.displayFile();
            p2.then (()=>{
                console.log('Promise2:'+message);
                this.displayFile();
            });
        });



    }



    displayFile()
    {
        
        let j:any;
        this.data1.forEach((element,i) => {
          
            for(j=0;j<element.length;j++){
            console.log ('data1: '+element[j]);
        }
        });

        this.data2.forEach((element,i) => {
          
            for(j=0;j<element.length;j++){
            console.log ('data2: '+element[j]);
        }
        });




      


    }

}