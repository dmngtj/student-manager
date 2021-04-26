import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../students.model';
import { StudentsService } from '../students.service';
import Swal from 'sweetalert2';

import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  public students:Student[]= [];
  id;
  public lengthStudent:number;

  
  constructor(
    private studentData: StudentsService,
    private router: Router,
    private route:ActivatedRoute
    ) { }

  ngOnInit() {
    this.getData()
  
  }


  public getData(){
    this.studentData.getStudents().subscribe((data) =>{
      this.students = data;
      this.studentData.setToTalStudent(data.length)
    })
  }
  
  public addStudent(){
    this.router.navigate(['student-form',0])
  }
  public deleteStudent(studentId){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will delete student!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.studentData.deleteStudent(studentId).subscribe((data)=>{
          this.getData()
        });
      }
    })

  }
  public editStudent(studentId){
    this.router.navigate(['student-form',studentId])
  }

}
