import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  images = ['../../assets/img/HP1.png', '../../assets/img/HP2.png', '../../assets/img/HP3.png']
  constructor() { }

  ngOnInit(): void {
  }

}
