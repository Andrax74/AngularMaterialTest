import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { NewContactComponent } from '../new-contact/new-contact.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(
    private dialog : MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openDialog() {

    let dialogRef = this.dialog.open(NewContactComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("the dialog was closed", result);

      if (result) {
        this.openSnackBar("Contact Added", "Navigate")
          .onAction().subscribe(() => {
              this.router.navigate(['/contactmanager', result.id])
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
