import { Component } from '@angular/core';
import { UserSchema } from '../Models/usersSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user:UserSchema = {}  
  constructor(private api:ApiService, private toaster:ToastrService){ }
  cancel(){
    this.user.email=""
    this.user.empId=""
    this.user.name=""
    this.user.status=""
  }

  addUser(){
    this.api.addUserAPI(this.user).subscribe({
      next:(res:any)=>{
        this.toaster.success("New Employee added successfully")
        this.cancel()
      },
      error:(reson:any)=>{
        console.log(reson);       
      }
    })
  }
}
