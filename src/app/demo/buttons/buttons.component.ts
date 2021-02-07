import { Component, OnInit } from '@angular/core';
import { filter, map, reduce } from 'rxjs/operators';

import { from } from 'rxjs';
import { rejects } from 'assert';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  constructor() { }

  serie = [
    {nome: 'The Walking Death', serie: 1, voto: 9.5, visto: true},
    {nome: 'Cernobyl', serie: 1, voto: 8.7, visto: true},
    {nome: 'Il trono di spade', serie: 4, voto: 9.8, visto: false},
  ];

  ngOnInit(): void {
    this.getSerie()
      .subscribe(
        (nome) => console.log(nome),
        (error) => console.log(error),
        () => console.log('Flusso terminato')
      );
  }

  getSerie() {

    return from(this.serie).pipe(
        filter(a => a.visto),
        map(a => a.nome)
      );
  }

}
