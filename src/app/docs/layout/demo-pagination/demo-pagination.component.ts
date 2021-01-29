import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-pagination',
  templateUrl: './demo-pagination.component.html',
  styleUrls: ['./demo-pagination.component.scss']
})
export class DemoPaginationComponent implements OnInit, OnDestroy {

  page: number = 1;
  count: number = 128;
  limit: number = 10;
  offset: number = 0;

  constructor() {
  }

  setPage(page) {
    this.offset = this.limit * (page - 1);
    this.page = page;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
