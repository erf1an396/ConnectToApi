import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnSameUrlNavigation } from '@angular/router';
import { response } from 'express';
import { UserManagmentService } from '../services/user-managment.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-user-managmnet',
  imports: [FormsModule , CommonModule],
  templateUrl: './user-managmnet.component.html',
  styleUrl: './user-managmnet.component.css'
})
export class UserManagmnetComponent implements OnInit {

  users:any[]=[];
  roles:any[]=[];
  selectedUserId:string="";
  selectedRole:string="";
  roleName = "";
  

 

  constructor(private userService:UserManagmentService,){}


  ngOnInit() {
      this.loadRoles();
      this.loadUsers();
      

      
  }

  loadUsers(){
    
    this.userService.getUsers().subscribe((response) => 
    {
      console.log(response);
      this.users = response 
    })
   
  }

  loadRoles(){
    this.userService.getRoles().subscribe((response) => 
    {

      console.log(response);
      this.roles = response
    })
  }

  deleteUser(userId:string){
    console.log(userId)
    if(confirm('آیا مطمئن هستید که این کاربر حذف شود؟'))
    {this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    })}
  }

  assignRole(userId:string,roleName:string){

    console.log(userId)
    
    this.userService.assignRole(userId, roleName).subscribe(() => {
      this.loadUsers();
    })
    
  }

  removeRole(userId:string , roleName:string){
    this.userService.removeRole(userId, roleName).subscribe(() => {
      this.loadUsers();
    })
  }

  addRole(roleName:string) {
    if (this.roleName.trim() !== '') {
      
      console.log(roleName)
      this.userService.addRole(this.roleName).subscribe(() => {
        this.roleName = '';
        this.loadRoles(); 
      });
    }
  }

  
 
}
