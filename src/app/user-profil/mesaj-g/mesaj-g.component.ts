import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {CourseServiceService} from '../../services/course/course-service.service';
import {AngularFireDatabase} from '@angular/fire/database';
declare let alertify:any;

@Component({
  selector: 'app-mesaj-g',
  templateUrl: './mesaj-g.component.html',
  styleUrls: ['./mesaj-g.component.css']
})
export class MesajGComponent implements OnInit {
  regiForm:FormGroup;
  dataCourses:any;
  userTemp:firebase.User
admin:boolean=false;
ogrencisleri:boolean=false;
ogrenci:boolean=false;
newdate :string;
time:any;

  constructor(public user: UserService, private fb:FormBuilder,private serviceCourses: CourseServiceService,private db:AngularFireDatabase) {
    this.regiForm= this.fb.group({
      'OgrenciId':[null,Validators.required],
      'baslık' :[null,Validators.required],
      'yazı':[null,Validators.required],
      
      })
   }
   
  ngOnInit() {
    this.serviceCourses.getOgrenci().subscribe(students=>this.dataCourses=students);
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
    var dateObj = new Date();
      var month = ("0" + (dateObj.getMonth() + 1)).slice(-2); //months from 1-12
      var day = ("0" + dateObj.getDate()).slice(-2)
      var year = dateObj.getFullYear();
      var currentdate = new Date();
       this.time =  currentdate.getHours() + ":"
                      + currentdate.getMinutes() + ":"
                      + currentdate.getSeconds();
  
     
       this.newdate = year + "-" + month + "-" + day;
       console.log(this.newdate)
  }
  
  onSubmit(from){
    console.log(from)
    if(this.regiForm.valid){
      this.serviceCourses.mesajYolla(from.OgrenciId,from.baslık,from.yazı,this.newdate,this.time);
      alertify.success("Mesaj Gönderildi");
    }
  }

}
