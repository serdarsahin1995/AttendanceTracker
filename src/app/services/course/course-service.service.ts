import { Injectable } from '@angular/core';
import {map, timeInterval} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
declare let alertify:any;
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
title:any;
teacher:any;
lt:Array<any>;
  constructor(private db: AngularFireDatabase,private router:Router) { }
    
    getAllcourses(user: firebase.User) {
       return  this.db.list('/ogretmen/' + user.uid + '/Courses').snapshotChanges().pipe(map(changes => changes
           .map(c => ({key: c.payload.key, ...c.payload.val()}))));
  }
  getAllcoursesStudent(user: firebase.User) {
    return  this.db.list('/ogrenci/' + user.uid + '/Courses').snapshotChanges().pipe(map(changes => changes
        .map(c => ({key: c.payload.key, ...c.payload.val()}))));
}
 
  getAttendance(user: firebase.User) {
       return  this.db.list('/Courses/' + user.uid + ':' ).snapshotChanges().pipe(map(changes => changes
           .map(c => ({key: c.payload.key, ...c.payload.val()}))));
  }
  
  getAllcoursess(){
      return  this.db.list('/AllCourses').snapshotChanges().pipe(
          map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
  }
  getOgretmen(){
    return  this.db.list('/ogretmen').snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
  }
  getOgrenci(){
    return  this.db.list('/ogrenci').snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
  }
  getAdmin(){
    return  this.db.list('/admin').snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
  }
  
    getItems() {
    return this.db.list('/requestCourses/').snapshotChanges();
    }

    getSubItems(key) {
    return this.db.list('/requestCourses/' + key + "/").snapshotChanges();
    }
  /*return  this.db.list('/requestCourses/').snapshotChanges().pipe(map(changes => changes
           .map(c => ({key: c.payload.key, ...c.payload.val()}))));*/
  sendRequest(user: firebase.User, key,title){
      this.db.object('/requestCourses/' + user.uid + '/' + key).update({
          email: user.email,
          uid: user.uid,
          Title: title
    })
    alertify.success("Ders isteği gönderildi");

  }

  getAllStudentProfile(user: firebase.User) {
    return  this.db.list('/ogrenci/').snapshotChanges().pipe(map(changes => changes
        .map(c => ({key: c.payload.key, ...c.payload.val()}))));
}
  getAllUsers(user: firebase.User) {
    return  this.db.list('/users/').snapshotChanges().pipe(map(changes => changes
        .map(c => ({key: c.payload.key, ...c.payload.val()}))));
}

  responseRequest(uid, key,emaill){    
    this.db.object('/AllCourses/' + key + "/Teacher").snapshotChanges().subscribe(c=>{this.teacher=c.payload.val(),
      this.db.object('/AllCourses/' + key + "/Title").snapshotChanges().subscribe(a=>{this.title=a.payload.val(),
      
        this.db.object('/ogrenci/' + uid + '/Courses/' + key).update({
          Title:this.title,
          Teacher:this.teacher,
          onay: true
       });
      
      })

    })
    //console.log("deneme teacher= "+teacher)
     
    //this.lt = [];
    //this.findTeacher(key).subscribe(c=>this.teacher=c.payload.val() );
    console.log(this.teacher)
    //this.findTitle(key).subscribe(c=>this.title=c.payload.val());
    console.log(this.title)
  //  console.log()
      
    this.db.object('/denemeDersler/' + key + '/students/' + uid).update({
      email: emaill //düzelt
    });
    this.db.object('/requestCourses/' + uid + '/' + key).remove();
  }

  
  ogrenciYap(key,email,name){
    if(window.confirm(name+' Öğrenci Yapmak istediğinize Emin misiniz?')){
    var x=this.db.createPushId();
    this.db.object('/ogrenci/'+key).update({
      email:email,
      name:name
    });
    this.db.object('users/'+key).remove();
  }
  }
  ogretmenYap(key,email,name){
    if(window.confirm(name+' Öğretmen Yapmak istediğinize Emin misiniz?')){
    var x=this.db.createPushId();
    this.db.object('/ogretmen/'+key).update({
      email:email,
      name:name
    });
    this.db.object('users/'+key).remove();
  }
  }
  ogrenciIsleriYap(key,email,name){
    if(window.confirm(name+' Öğrenci işleri Yapmak istediğinize Emin misiniz?')){
    var x=this.db.createPushId();
    this.db.object('/ogrenciIsleri/'+key).update({
      email:email,
      name:name
    });
    this.db.object('users/'+key).remove();
  }
  }
 AddCourse(Title,Teacher,uid){
   var x =this.db.createPushId();
   this.db.object('/AllCourses/' + x).update({
    Title: Title,
    Teacher:Teacher
  });
  this.db.object('/ogretmen/' + uid + '/Courses/' +x).update({
  Title: Title,
  Teacher:Teacher
});
this.db.object('/denemeDersler/' + x).update({
  Title: Title,
}).then((result)=> this.router.navigate(['myProfil']));;;

 }
 mesajYolla(key,baslık,mesaj,newdate,time){
  var x =this.db.createPushId();
  this.db.object('/ogrenci/' + key+'/Mesaj/'+x).update({
    baslik:baslık,
    Mesaj: mesaj,
    Tarih:newdate,
    boolean:false,
    Time:time,
  }).then((result)=> this.router.navigate(['myProfil']));;;
}
otoMesaj(user: firebase.User,newdate,time){
  var x ='dikkat';
  this.db.object('/ogrenci/' + user.uid+'/Mesaj/'+x).update({
    baslik:'Dikkat',
    Mesaj: 'Dersten kaldın Danışmanına danış',
    Tarih:newdate,
    boolean:false,
    Time:time,
  });;

}
 
getMyStudents(x){
    return  this.db.list('/denemeDersler/'+x+'/students/').snapshotChanges().pipe(map(changes => changes
      .map(c => ({key: c.payload.key, ...c.payload.val()}))));

  }
 

  getAtt(studentid,courseid,attendance,date){
  
   /* this.db.object('denemeDersler/' + courseid+'/attendance/'+studentid).update({
     date : attendance
   });*/

   this.db.object('denemeDersler/' + courseid+'/attendance/'+studentid+'/'+date).update({
     statu:attendance});

  }
  
  editStudent(name,uid){
    this.db.object('/ogrenci/'+uid).update({
      name:name
    }).then((result)=> this.router.navigate(['myProfil']));;
 
   }

   removeCourse(key){
    this.db.object('AllCourses/' + key).remove();
    alertify.error("Ders Silindi");
   }
   getAttDetails(ıd,user:firebase.User){
    return  this.db.list('/denemeDersler/'+ıd+'/attendance/'+user.uid).snapshotChanges().pipe(map(changes => changes
      .map(c => ({key: c.payload.key, ...c.payload.val()}))));
   }
   mesajDetayları(id){
    return  this.db.list('/ogrenci/'+id+'/mesaj/').snapshotChanges().pipe(map(changes => changes
      .map(c => ({key: c.payload.key, ...c.payload.val()}))));
   }
  

   dropCourses(courseid,user:firebase.User){
    console.log("girdi")
   this.db.object('/ogrenci/'+user.uid+'/Courses/'+courseid).remove().then(()=>this.db.object('/denemeDersler/'+courseid+'/students/'+user.uid).remove()
   .then(()=>this.db.object('/denemeDersler/'+courseid+'/attendance/'+user.uid).remove())
   
   );
   alertify.error("Ders Silindi");
  }
  
}