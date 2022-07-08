import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  images = ['../../assets/img/HP1.png', '../../assets/img/HP1-RESP.png', '../../assets/img/HP1-RESP(420).png', '../../assets/img/HP1-RESP(720).png', '../../assets/img/HP2.png', '../../assets/img/HP2-RESP.png', '../../assets/img/HP2-RESP(420).png', '../../assets/img/HP2-RESP(720).png', '../../assets/img/HP3.png', '../../assets/img/HP3-RESP.png', '../../assets/img/HP3-RESP(410).png', '../../assets/img/HP3-RESP(720).png']
  constructor() { }

  ngOnInit(): void {
  }

}
