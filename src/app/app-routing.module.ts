import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeComponent } from './dersListesi/liste.component';
import { LoginComponent } from './login/login.component';
import { DersEkleComponent } from './dersListesi/ders-ekle/ders-ekle.component';
import { DersSilComponent } from './dersListesi/ders-sil/ders-sil.component';
import { DersInfoComponent } from './dersListesi/ders-info/ders-info.component';
import { CreateComponent } from './attendance/create/create.component';
import { EditComponent } from './attendance/edit/edit.component';
import { ViewComponent } from './attendance/view/view.component';
import { TakeComponent } from './attendance/take/take.component';
import { EditAttendanceComponent } from './attendance/edit-attendance/edit-attendance.component';
import { AppComponent } from './app.component';
import {CourseComponent} from './course/course.component';
import {ListAllcourseComponent} from './list-allcourse/list-allcourse.component';
import {ResponseRequestComponent} from './response-request/response-request.component';
import { UserService } from './user.service';
import {UserProfilComponent} from './user-profil/user-profil.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {AtamaComponent} from './atama/atama.component';
import {UserEditComponent } from './user-profil/user-edit/user-edit.component'
import {MyProfilComponent} from './user-profil/my-profil/my-profil.component'
import {MesajGComponent} from './user-profil/mesaj-g/mesaj-g.component'
import { SiteDetayComponent } from './login/site-detay/site-detay.component';

const routes: Routes = [
	{ path:'',component:LoginComponent},
	{ path: 'liste',component:ListeComponent,canActivate:[UserService]},
	{ path: 'dersEkle', component:DersEkleComponent,canActivate:[UserService]},
	{ path: "dersSil", component:DersSilComponent,canActivate:[UserService]},
	{ path: "dersInfo", component:DersInfoComponent,canActivate:[UserService]},
    {path:"Oders", component:CourseComponent,canActivate:[UserService]},
	{ path: "createAttendance", component: CreateComponent,canActivate:[UserService]},
	{ path: "editAttendance", component: EditComponent,canActivate:[UserService]},
	{ path: "viewAttendance", component: ViewComponent,canActivate:[UserService]},
	{ path: "takeAttendance", component: TakeComponent,canActivate:[UserService]},
	{ path: "editTakedAttendance", component: EditAttendanceComponent ,canActivate:[UserService]},
    { path: "listAllCourses", component : ListAllcourseComponent,canActivate:[UserService]},
	{ path: "requests", component: ResponseRequestComponent,canActivate:[UserService]},
	{path : "userProfil", component: UserProfilComponent, canActivate:[UserService]},
	{path : "register",component:RegisterUserComponent},
	{path : "forgotPassword",component:ForgotPasswordComponent},
	{path : "atama",component:AtamaComponent, canActivate:[UserService]},
	{path : "editProfil",component:UserEditComponent, canActivate:[UserService]},
	{path : "myProfil",component:MyProfilComponent, canActivate:[UserService]},
	{path : "mesajGonder", component:MesajGComponent, canActivate:[UserService]},
	{path : "detay", component:SiteDetayComponent},

  {path:"app", component:AppComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
