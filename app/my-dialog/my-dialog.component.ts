import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

     }

  ngOnInit(): void {
  }
  save() {
    console.log(this.dialogRef.close("IT WAS SAVED"));
  }
  cancel(){
    console.log(this.dialogRef.close("IT WAS NOT SAVED"));
  }
  
}
