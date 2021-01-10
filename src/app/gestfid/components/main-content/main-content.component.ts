import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ClientiService } from '../../services/clienti.service';
import {IClienti2} from '../../Models/interfaces';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  cliente: IClienti2;
  codFid: string;

  constructor(private route: ActivatedRoute, private clienteService: ClientiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.codFid = params['codFid'];
      console.log("CodFid: " + this.codFid);

      this.cliente = null;

      if (this.codFid) {
        this.getDatiCliente();
      }

    },
    error => {
      console.log(error);
    })
  }

  getDatiCliente() {

    this.clienteService.getByCodFid(this.codFid).subscribe(
      response => {
        console.log('Ricerchiamo il cliente ');

        this.cliente = response;
        console.log(this.cliente);
    },
    error => {
      console.log(error);
    })

  }


}
