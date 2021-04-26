import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path: 'home',component: HomeComponent,canActivate: [AuthGuard]},
  {path: 'about',component: AboutComponent,canActivate: [AuthGuard]},
  {path: 'student',component: StudentsComponent,canActivate: [AuthGuard]},
  {path: 'student-form/:id',component: StudentFormComponent,canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
