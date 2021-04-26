import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import 'sweetalert2/src/sweetalert2.scss';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name:string="";
  pass:string="";
  constructor(private router:Router,private studentService:StudentsService) { }

  ngOnInit(): void {
  }
  public login(){
    if(this.name== ''){
      Swal.fire('Oops...', 'Username cannot be left blank!', 'error');
    }else if(this.pass == ''){
      Swal.fire('Oops...', 'Password cannot be left blank!', 'error');
    }else{
      this.studentService.loginWithNameAndPass(this.name,this.pass).subscribe((res: any) => {
         const user = res.findIndex(v=>v.name === this.name && v.pass === this.pass);
         if(user == -1){
          Swal.fire('Oops...', 'Username or password are wrong!', 'error');
          }else{
           this.studentService.setToken(JSON.stringify(res[user]));
            Swal.fire('Success', 'Login success', 'success');
            setTimeout(()=>{
              this.router.navigate(['/student'])
            },2000)
          }
      })
    }
  }
}
