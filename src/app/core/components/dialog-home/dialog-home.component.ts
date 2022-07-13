import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-home',
  templateUrl: './dialog-home.component.html',
  styleUrls: ['./dialog-home.component.scss']
})
export class DialogHomeComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogHomeComponent);
  }

  ngOnInit(): void {
  }

}
