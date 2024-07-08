import { Component, OnInit } from '@angular/core';
import { UserSchema } from '../Models/usersSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  page: number = 1;
  searchKey:string = ""
  allUsers:UserSchema[]=[]
  
  ngOnInit(): void {
    this.getAllUsersList()
  }

  constructor(private  api:ApiService, private toaster:ToastrService){ }

  getAllUsersList(){
    this.api.getAllUserAPI().subscribe({
      next:(result:any)=>{
        this.allUsers = result
        console.log(this.allUsers);
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }

  deleteUser(id:any){
    this.api.removeUserAPI(id).subscribe(
      (res:any)=>{
        this.toaster.success("user removed")
        this.getAllUsersList()
      }
    )
  }

  generatePDF(){
    let pdf = new jspdf()
    let head = [['EmpId','Username','Email','Status']]
    let body:any = []
    this.allUsers.forEach((item:any)=>{
      if(item.id!='1'){
        body.push([item.empId,item.name,item.email,item.status])
      }
    })
    pdf.setFontSize(16)
    pdf.text("All Users List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('alluserslists.pdf')
  }

  sortByName(){
    this.allUsers.sort((user1:any,user2:any)=>user1.empId.localeCompare(user2.name))
  }

  sortById(){
    this.allUsers.sort((user1:any,user2:any)=>user1.empId.localeCompare(user2.empId))
  }
}