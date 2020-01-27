import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {CourseServiceService} from '../../services/course/course-service.service';
import {AngularFireDatabase} from '@angular/fire/database';
declare let alertify:any;

@Component({
  selector: 'app-ders-ekle',
  templateUrl: './ders-ekle.component.html',
  styleUrls: ['./ders-ekle.component.css']
})
export class DersEkleComponent implements OnInit {
  regiForm:FormGroup;
  dataCourses:any;
  userTemp:firebase.User
admin:boolean=false;
ogrencisleri:boolean=false;
ogrenci:boolean=false;

constructor(public user: UserService, private fb:FormBuilder,private serviceCourses: CourseServiceService,private db:AngularFireDatabase) {
  this.regiForm= this.fb.group({
  'DersinAdı':[null,Validators.required],
  'DersinOgretmeni':[null,Validators.required],
  'OgretmenID':[null,Validators.required],
  })
  }
  ngOnInit() {
    this.serviceCourses.getOgretmen().subscribe(courses => this.dataCourses = courses);
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
  onSubmit(from){
    console.log(from)
    if(this.regiForm.valid){
      this.serviceCourses.AddCourse(from.DersinAdı,from.DersinOgretmeni,from.OgretmenID);
      alertify.success("Ders Eklendi");
    }
  

  }
}
