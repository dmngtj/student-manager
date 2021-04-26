import {  Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'ag-quanlysinhvien';
  lengthStudent=2;

  constructor(private student: StudentsService ) { }
  ngOnInit(){
   this.student.totalStudents$.subscribe((total)=>{
     this.lengthStudent = total;
   })
  }
    
  logout(){
    this.student.logout();
  }

}