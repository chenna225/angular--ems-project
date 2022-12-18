import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient) {  }

   addEmployee(data : any){
    return this.http.post("http://localhost:3000/employees",data).pipe(map((res:any)=>{
      return res;
    }))
   }

   getAllEmployee(){
     return this.http.get<any>("http://localhost:3000/employees").pipe(map((res:any)=>{
      return res;
    }))
   }

   updateEmployee(data: any, id: number){
     return this.http.put<any>("http://localhost:3000/employees/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
   }

   deleteEmployee(id : number) {
     return this.http.delete<any>("http://localhost:3000/employees/"+id).pipe(map((res:any)=>{
      return res;
    }))
   }
  

}
