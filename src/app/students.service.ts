
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from './students.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
    totalStudents;

    public totalStudents$ = new BehaviorSubject<number>(0);

    constructor(private http:HttpClient,private router:Router){}
    public httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    private url = "https://managestudent123.herokuapp.com/";
    
    public getStudents(){
      return this.http.get<any>(`${this.url}students`,this.httpOptions);
    }
    public getStudentById(studentId){
      return this.http.get<any>(`${this.url}students/`+studentId,this.httpOptions);
    }

    public addStudent(data){
      return this.http.post<any>(`${this.url}students`,data,this.httpOptions);
    }
    public updateStudent(data,idStudent){
      return this.http.put<any>(`${this.url}students/`+idStudent,data,this.httpOptions);
    }

    public deleteStudent(studentId){
      return this.http.delete<any>(`${this.url}students/`+studentId);
    }
    public setToTalStudent(total){
        this.totalStudents = total;
        this.totalStudents$.next(total);
    }
    public setToken(string:string){
      localStorage.setItem('user',string);
    }
    
    public getToken(){
      return localStorage.getItem('user');
    }
    public isLoggedIn():boolean{
      return this.getToken() !== null;
    }
    public removeToken(){
      localStorage.removeItem('user');
    }
    public logout(){
      this.removeToken();
      this.router.navigate(['/login']);
    }

    public loginWithNameAndPass(name:string,pass:string){
      return this.http.get<any>(`${this.url}users/`,this.httpOptions).pipe(map(res => {
        return res;
      }));

    }

}
