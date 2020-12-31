import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { IUsers } from '../../models/interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  userId: number;
  user: IUsers;
  users : IUsers[];

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log("Id: " + this.userId);

      this.userService.loadAll().subscribe(
        response => {
          console.log('Ricerchiamo tutti gli utenti ');

          this.users = response;
          console.log(this.users);

          this.user = this.users.find(x => x.id == this.userId);
          console.log(this.user);
      },
      error => {
        console.log(error);
      })

    });

    //this.userId = this.route.snapshot.params['id'];

  }

}
