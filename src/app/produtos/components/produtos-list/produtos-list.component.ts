import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit {

  filtro = false;

  images = ['../../../../assets/img/2.png', '../../../../assets/img/5.png', '../../../../assets/img/6.png']


  constructor() { }

  filtroClick() {
    this.filtro = !this.filtro;
  }

  ngOnInit(): void {
  }

}
