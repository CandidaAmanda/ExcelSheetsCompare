export class SheetUpload
{
    //Identify if file is uploaded or not
    invoiceUploaded:boolean=false;
    iTimeUploaded:boolean=false;

    //Initialize Input file fields
    InvoiceSheet:File;
    ItimeSheet:File;

    uploadSheet(e:Event,fileType:String)
    {
        console.log('Within service'+ fileType);
        if ((<HTMLInputElement>e.target).files.length>0)
        {   
            if (fileType=='in')
            {
                this.InvoiceSheet=(<HTMLInputElement>e.target).files[0];
                this.invoiceUploaded=true;
                console.log(this.invoiceUploaded);
            }
            
            else if (fileType=='it')
            {
                this.ItimeSheet=(<HTMLInputElement>e.target).files[0];
                this.iTimeUploaded=true;
                console.log(this.iTimeUploaded);
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

}