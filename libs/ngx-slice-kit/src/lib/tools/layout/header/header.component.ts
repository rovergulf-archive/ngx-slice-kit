import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from "../../../core/services/layout.service";
import { ThemeService } from "ngx-slice-kit";

@Component({
  selector: 'kit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() scrolled: boolean;

  constructor(
      public layout: LayoutService,
      public theme: ThemeService
  ) {
  }

  toggleTheme(): void {
    // idk may be
    this.layout.toggleTheme();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
