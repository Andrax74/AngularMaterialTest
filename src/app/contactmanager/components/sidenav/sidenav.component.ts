import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';

import { IUsers } from '../../models/interfaces';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BK = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean;

  users : IUsers[];

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) { }

    @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit(): void {

      this.breakpointObserver
        //.observe([Breakpoints.XSmall])
        .observe([`(max-width: ${SMALL_WIDTH_BK}px)`])
        .subscribe((state: BreakpointState) => {
            console.log(state.matches);
            this.isScreenSmall = state.matches;
        });

      this.getUsers();

      this.router.events.subscribe(() => {

        if (this.isScreenSmall) {
          this.sidenav.close();
        }
      });
  }

  public getUsers() {

    this.userService.loadAll().subscribe(
      response => {
        console.log('Ricerchiamo tutti gli utenti ');

        this.users = response;
        console.log(this.users);

        if (this.users.length > 0)
          this.router.navigate(['/contactmanager', this.users[0].id])

    },
    error => {
      console.log(error);
    })
  }

}
