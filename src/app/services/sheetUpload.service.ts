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

    parseSheets()
    {
        //Convert Invoice sheet to arraylist
        let fileReader1 = new FileReader();    
        fileReader1.readAsArrayBuffer(this.InvoiceSheet);
        fileReader1.onload = (e) => {    
        this.arrayBuffer = fileReader1.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
        var bstr = arr.join("");    
        var workbook = XLSX.read(bstr, {type:"binary"});    
        var first_sheet_name = workbook.SheetNames[0];    
        var worksheet = workbook.Sheets[first_sheet_name];       
        this.invoiceObject = XLSX.utils.sheet_to_json(worksheet,{raw:true});        
                 
        }

        //convert ITime sheet to arraylist
        let fileReader2 = new FileReader();  
        fileReader2.readAsArrayBuffer(this.ItimeSheet);
        fileReader2.onload = (e) => {    
        this.arrayBuffer = fileReader2.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
        var bstr = arr.join("");    
        var workbook = XLSX.read(bstr, {type:"binary"});    
        var first_sheet_name = workbook.SheetNames[0];    
        var worksheet = workbook.Sheets[first_sheet_name];       
        this.itimeObject = XLSX.utils.sheet_to_json(worksheet,{raw:true});   
              
        }

        /*
        invoiceObject
        itimeObject
        */
        
    }

    compareTwoSheets()
    {
        //async await
        setTimeout(()=>console.log(this.itimeObject) ,1000);
        console.log(this.invoiceObject);    
          
    }

}