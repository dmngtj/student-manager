
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  profileForm = new FormGroup({
    code: new FormControl(''),
    gender: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    picture: new FormControl(''),
  });
  public id;
  
  constructor(private student: StudentsService,  private router: Router,private route: ActivatedRoute) { }

  

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.id = id;
    this.loadData(id);
  }

  public loadData(id){
    this.student.getStudentById(id).subscribe((data) =>{
      for (const controlName in this.profileForm.controls) {
        if (controlName) {
          this.profileForm.controls[controlName].setValue(data[controlName]) 
        }
      }
    })
  }

  public onSubmit(){
    const newStudent = {};
   
    for (const controlName in this.profileForm.controls) {
      if (controlName) {
        newStudent[controlName] = this.profileForm.controls[controlName].value;   
      }
    }

      if(this.id>0){
        this.student.updateStudent(newStudent,this.id).subscribe((data)=>{
          this.router.navigate(['student'])
        })
      }else{
        this.student.addStudent(newStudent).subscribe((data) =>{
          this.router.navigate(['student'])
      });
    }
   
  }
}
