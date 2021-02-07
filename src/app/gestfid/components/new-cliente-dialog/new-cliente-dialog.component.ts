import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ClientiService } from '../../services/clienti.service';
import { IClienti, IStatoCliente } from '../../Models/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-cliente-dialog',
  templateUrl: './new-cliente-dialog.component.html',
  styleUrls: ['./new-cliente-dialog.component.scss']
})
export class NewClienteDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<NewClienteDialogComponent>,
    private clientiService: ClientiService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cliente: IClienti = {
    codFid: '-1',
    nominativo: '',
    comune: '',
    idAvatar: '',
    stato: 0,
    transazioni: null
  };

  statoCliente: IStatoCliente[] =
  [
    {
      value: 0,
      viewValue: 'Non Attivo'
    },
    {
      value: 1,
      viewValue: 'Attivo'
    }
  ];

  avatars = [
    'svg-1','svg-2','svg-3','svg-4','svg-5','svg-6','svg-7',
    'svg-8','svg-9','svg-10','svg-11','svg-12'
  ]

  ngDestroy$ = new Subject();

  codfid = new FormControl('', [Validators.required]);
  nome = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]);
  stato = new FormControl(1);

  getErrMsgCodFid() {

    return this.codfid.hasError('required') ? 'Devi inserire il codice fidelity!' : '';
  }

  getErrMsgNominativo() {

    if (this.nome.hasError('maxlength')) {
      return 'Il nome deve avere un massimo di 50 caratteri!';
    }

    if (this.nome.hasError('minlength')) {
      return 'Il nome deve avere almeno 6 caratteri!';
    }

    return this.nome.hasError('required') ? 'Devi inserire il nominativo' : '';
  }

  ngOnInit(): void {

    if (this.data) {
      console.log(this.data.codFid);

      this.clientiService.getByCodFid2(this.data.codFid)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(
        response => {
          this.cliente = response;
          this.codfid.setValue(this.cliente.codFid);
          this.nome.setValue(this.cliente.nominativo);
          this.stato.setValue(this.cliente.stato);

          this.codfid.disable();

          console.log(this.cliente);
        },
        error => {
          console.log(error);
        }
      );

    }
  }

  ngOnDestroy() {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  save() {

    if (this.codfid.hasError('required'))
    {
      this.openSnackBar(`Il codice fidelity inserito NON è valido!`, "Errore di Validazione");
    }
    else if (this.nome.hasError('maxlength') || this.nome.hasError('minlength') || this.nome.hasError('required'))
    {
      this.openSnackBar(`Il nominativo del cliente non è valido!`, "Errore di Validazione")
    }
    else
    {
      this.cliente.codFid = this.codfid.value;
      this.cliente.nominativo = this.nome.value;
      this.cliente.stato = this.stato.value;

      this.dialogRef.close(this.clientiService.insCliente(this.cliente));
    }
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
