import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../module/employee';


@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.scss']
})
export class EmpdashboardComponent implements OnInit {

    addEmployee : boolean;
    updateEmployee !: boolean;
    empDetails !: FormGroup;
    empObj : Employee = new Employee();
    empList : Employee[] = [];

  constructor(private formbuilder: FormBuilder, private empService: EmployeeService) { }

  ngOnInit(): void {
    this.empDetails = this.formbuilder.group({
      id : [''],
      fname : [''],
      lname : [''],
      phonenumber: [''],
      emailid: ['']
    });  
    this.getAllEmployeeData();
}
clickaddEmployee(){
  this.empDetails.reset();
  this.addEmployee = true;
  this.updateEmployee = false;
}
addEmployeeDetails(){
    this.empObj.id = this.empDetails.value.id;
    this.empObj.fname = this.empDetails.value.fname;
    this.empObj.lname = this.empDetails.value.lname;
    this.empObj.phonenumber = this.empDetails.value.phonenumber;
    this.empObj.emailid = this.empDetails.value.emailid;

    this.empService.addEmployee(this.empObj).subscribe(res=>{
      console.log(res);
      alert("Employee added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.empDetails.reset();
      this.getAllEmployeeData();
    },err=>{
      console.log("something went wrong")
    });
  }

  getAllEmployeeData() {
    this.empService.getAllEmployee().subscribe(res=>{
        this.empList = res;
    },err=>{
      console.log("error while fetching data.")
    });
}

editEmployeeDetails(employee : any) {
  this.addEmployee = false;
  this.updateEmployee = true;
  this.empObj.id = employee.id;
  this.empDetails.controls['id'].setValue(employee.id);
  this.empDetails.controls['fname'].setValue(employee.fname);
  this.empDetails.controls['lname'].setValue(employee.lname);
  this.empDetails.controls['phonenumber'].setValue(employee.phonenumber);
  this.empDetails.controls['emailid'].setValue(employee.emailid);

}

deleteEmployeeDetails(employee: any){
  this.empService.deleteEmployee(employee.id).subscribe(res=>{
    alert("Employee Details Deleted");
    this.getAllEmployeeData();
  })
}
updateEmployeeDetails() {
  this.empObj.id = this.empDetails.value.id;
  this.empObj.fname = this.empDetails.value.fname;
  this.empObj.lname = this.empDetails.value.lname;
  this.empObj.phonenumber = this.empDetails.value.phonenumber;
  this.empObj.emailid = this.empDetails.value.emailid;

  this.empService.updateEmployee(this.empObj,this.empObj.id).subscribe(res=>{
    alert("Employee details Updated Successfully");
    let ref = document.getElementById('cancel')
      ref?.click();
    this.empDetails.reset();
    this.getAllEmployeeData();
  },err=>{
    alert("Employee details not Updated");
  })

}
viewEmployeeDetails(){
    this.empDetails.reset();
    this.getAllEmployeeData();
}

}
