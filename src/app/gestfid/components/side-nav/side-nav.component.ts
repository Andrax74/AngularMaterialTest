import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

const SMALL_WIDTH_BK = 720;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideBarComponent implements OnInit {

  public isScreenSmall: boolean;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    this.breakpointObserver
      //.observe([Breakpoints.XSmall,Breakpoints.Small])
      .observe([`(max-width: ${SMALL_WIDTH_BK}px)`])
      .subscribe((state: BreakpointState) => {
        console.log(state.matches);
        this.isScreenSmall = state.matches;
    });
  }

}
