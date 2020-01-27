import { Component, OnInit } from '@angular/core';
import {CourseServiceService} from '../services/course/course-service.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from '../user.service';
declare let alertify:any;

@Component({
  selector: 'app-atama',
  templateUrl: './atama.component.html',
  styleUrls: ['./atama.component.css']
})

export class AtamaComponent implements OnInit {
  dataCourses: any;
key:any;
email:any;
userTemp:firebase.User
admin:boolean=false;
ogrencisleri:boolean=false;
ogrenci:boolean=false;
  constructor(private cs:CourseServiceService, private afAuth: AngularFireAuth,private db:AngularFireDatabase,private user:UserService) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user => this.cs.getAllUsers(user).subscribe(user => this.dataCourses = user));

    this.user.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
    this.db.list('/admin/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.userTemp.uid==key){
        this.admin=true;
        console.log(key)
        console.log(this.userTemp.uid)
       }     
     });
    });
    this.db.list('/ogrenciIsleri/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.userTemp.uid==key){
        this.ogrencisleri=true;
        console.log(key)
        console.log(this.userTemp.uid)
       }     
     });

    });
    this.db.list('/ogrenci/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.userTemp.uid==key){
        this.ogrenci=true;
        console.log(key)
        console.log(this.userTemp.uid)
       }     
     });

    });
  }
  ogrenciYap(row)
{
this.key=row.key
this.email=row.email;
console.log(this.key)
this.cs.ogrenciYap(row.key,row.email,row.name);
alertify.success("Ogrenci Yapıldı");
}
ogretmenYap(row)
{
this.key=row.key
this.email=row.email;
console.log(this.key)
this.cs.ogretmenYap(row.key,row.email,row.name);
alertify.success("Ogretmen Yapıldı");
}
ogrenciIsleriyap(row)
{
this.key=row.key
this.email=row.email;
console.log(this.key)
this.cs.ogrenciIsleriYap(row.key,row.email,row.name);
alertify.success("Ogrenci isleri Yapıldı");
}
}
