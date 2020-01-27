import { Component, OnInit } from '@angular/core';
import {CourseServiceService} from '../services/course/course-service.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from '../user.service';
import {Router}  from '@angular/router';

@Component({
  selector: 'app-response-request',
  templateUrl: './response-request.component.html',
  styleUrls: ['./response-request.component.css']
})
export class ResponseRequestComponent implements OnInit {
listArray: Array<Object>;
listRequest: Array<String>;
admin:boolean=false;
ogrencisleri:boolean=false;
ogrenci:boolean=false;
userTemp:firebase.User
  constructor(public user:UserService,private db:AngularFireDatabase,private cs: CourseServiceService , private afAuth: AngularFireAuth,private router:Router) { }
count =0;
  ngOnInit() {
    this.user.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
      const z = [];
       this.listArray = [];

      this.cs.getItems().subscribe(items => {
          items.forEach(values => {

                 this.listRequest = [];
                let key = values.key;

                this.listRequest.push(key);
                this.listRequest.push('email')
                console.log(this.listRequest)
              this.listArray.push(this.listRequest);
              console.log(this.listArray)
           });

      for (let i = 0; i < this.listArray.length; i++) {

          this.cs.getSubItems(this.listArray[i][0]).subscribe(subItems => {
                  //  console.log(this.listArray[i][0]);
                  //console.log(subItems)
                   let k=2;
                  subItems.forEach(uid => {
                      this.listArray[i][k]=(uid.key);//tek eleman id
                      k++;
                      this.listArray[i][k]=uid.payload.child("Title").val() //her çift title
                      k++;
                  });
                /*  console.log(email.key)
                  if(email.key=='email'){
                    this.listArray[i][1]=email
                    console.log(email)
                  }*/             
              
              });
            }
            for (let i = 0; i < this.listArray.length; i++) {

              this.cs.getSubItems(this.listArray[i][0]).subscribe(sub=>{
                this.cs.getSubItems(sub.forEach(a=>{
                  this.listArray[i][1]=(a.payload.child('email').val());
                    console.log(a.payload.child('email').val())
                    
                }));

              });

                }
      console.log(this.listArray);
      });


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
    applyRequest(uid, key,email){
      
          this.cs.responseRequest(uid, key,email);
          console.log(email)
          window.location.reload();
    }
}
