import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormsModule,FormGroup,ReactiveFormsModule } from '@angular/forms';
import {ApiService} from '../api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  book:any=[];
  book1:any=[];
  Department:any=[];
  dept:any=[];
  startdate;
  enddate;
  selectDept;
  RoomType:any=[];
  roomtype:any=[];
  select:any[];
    constructor(private s1:ApiService) {
   
   }

  ngOnInit(): void {
    this.s1.getdepartments().subscribe((data:{})=>{
      this.Department=data;
      this.Department.forEach(element => {
        this.dept.push(element.dept_name)
      });
    });
    
    this.s1.getRoomTypes().subscribe((data:{})=>{
      this.RoomType=data;
      this.RoomType.forEach(element => {
        this.roomtype.push(element.room_type_name)
      });
    });
  }
  SelectDepartment(value:any){
    return this.s1.getAdminReport().subscribe((data:{})=>{
      // this.book=data;
      this.book1=data;
      console.log(this.book);
      if(value=="0")
      {
          // this.book=this.book1;
      
      }
     
     else
    {
      // this.book = this.book1.filter((item) => (item.dept_name == value)); 
      //console.log(value)
    this.selectDept=value;
    }

    });

  }
  SelectRoomType(value:any){
    return this.s1.getAdminReport().subscribe((data:{})=>{
      this.book=data;
      this.book1=data;
      console.log(this.book);
      if(value=="0")
      {
          this.book=this.book1;
      
      }
     
     else
    {
      this.book = this.book1.filter((item) => (item.room_type_name == value && item.dept_name == this.selectDept)); 
      //console.log(value)
    
    }
    });
  }
  
 loadData($event)
 {
   return this.s1.getAdminReport().subscribe((data:{})=>{
     this.book=data;
     console.log(this.book);
   });
 }

selectedStartDate: Date = new Date();
selectedEndDate: Date = new Date();

getstartDate(date){
    this.startdate = moment(date).format("YYYY-MM-DD");
    console.log(this.startdate);
}
getendDate(date){
  this.enddate = moment(date).format("YYYY-MM-DD");
  console.log(this.enddate);
  
}

}
