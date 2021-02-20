import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { NewClienteDialogComponent } from '../new-cliente-dialog/new-cliente-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private dialog : MatDialog, private snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
  }

  openDialog() {

    let dialogRef = this.dialog.open(NewClienteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("il dialog è stato chiuso", result);

      if (result) {

        this.openSnackBar(`Cliente ${result.__zone_symbol__value.nominativo} salvato!`, "Apri Scheda")
          .onAction().subscribe(() => {
              this.router.navigate(['/gestfid', result.__zone_symbol__value.codFid]);
          });

      }
    });

  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
  });
}

}
