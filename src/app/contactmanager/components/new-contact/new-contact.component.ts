import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { IUsers } from '../../models/interfaces';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NewContactComponent>) { }

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter the name' : '';
  }

  avatars = [
    'svg-1','svg-2','svg-3','svg-4'
  ]

  user: IUsers = {
    id: -1,
    birthDate: null,
    name: '',
    avatar: '',
    bio: ''
  };

  ngOnInit(): void {
  }

  save() {
    this.user.name = this.name.value;

    this.dialogRef.close(this.user);
  }

  dismiss() {
    this.dialogRef.close(null);

  }

}
