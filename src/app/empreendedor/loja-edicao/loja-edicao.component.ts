import { Component, OnInit } from '@angular/core';
import { Loja } from 'src/app/core/models/loja';

@Component({
  selector: 'app-loja-edicao',
  templateUrl: './loja-edicao.component.html',
  styleUrls: ['./loja-edicao.component.scss']
})
export class LojaEdicaoComponent implements OnInit {
  loja: Loja = new Loja();
  
  lojas: Loja[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
