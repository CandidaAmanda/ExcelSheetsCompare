import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { UploadFormComponent } from './upload-form/upload-form.component';



const routes : Routes =[
{path: '', component: UploadFormComponent},
{path: 'home', component: UploadFormComponent},
{path: 'aboutus', component: AboutUsComponent},
{path: 'login', component: LoginComponent}

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})


export class AppRoutingModule{


}