import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.scss']
})
export class ProdutoDetailComponent implements OnInit {

  images = ['../../../../assets/img/3.png', '../../../../assets/img/4.png', '../../../../assets/img/1.png']

  constructor() { }

  ngOnInit(): void {
  }

}
