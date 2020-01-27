import { Component, OnInit } from '@angular/core';
import {CourseServiceService} from '../services/course/course-service.service';
import {Subscriber, Subscription} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from '../user.service';

@Component({
  selector: 'app-list-allcourse',
  templateUrl: './list-allcourse.component.html',
  styleUrls: ['./list-allcourse.component.css']
})
export class ListAllcourseComponent implements OnInit {
dataCourses: any;
userTemp:firebase.User
admin:boolean=false;
ogrencisleri:boolean=false;
ogrenci:boolean=false;
  constructor(private cs: CourseServiceService , private afAuth: AngularFireAuth ,private db:AngularFireDatabase,private user:UserService) { }

  ngOnInit() {
      this.cs.getAllcoursess().subscribe(courses => this.dataCourses = courses);
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
  getReq(key,teacher,title){
    if(window.confirm('Dersi Eklemek İstediğinize Emin misiniz?!!????'))this.afAuth.user.subscribe(user => this.cs.sendRequest(user, key,title));
    
  }
  remove(key){
    if(window.confirm('Silmek istediğinize Emin misiniz?!!????'))this.cs.removeCourse(key);

  }
}
