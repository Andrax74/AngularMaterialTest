import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-gestfid-app',
  templateUrl: './gestfid-app.component.html',
  styleUrls: ['./gestfid-app.component.scss']
})
export class GestfidAppComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry,sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg'));
  }

  ngOnInit(): void {
  }

}
