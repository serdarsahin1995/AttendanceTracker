import { Component, OnInit } from '@angular/core';
import {CourseServiceService} from '../../services/course/course-service.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
    dataCourses: any;
    constructor(private serviceCourses: CourseServiceService, private afAuth: AngularFireAuth) { }

    ngOnInit() {
      this.afAuth.user.subscribe(user => this.serviceCourses.getAttendance(user).subscribe(Courses => this.dataCourses = Courses));

    }

}
