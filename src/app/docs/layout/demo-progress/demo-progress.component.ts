import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-progress',
  templateUrl: './demo-progress.component.html',
  styleUrls: ['./demo-progress.component.scss']
})
export class DemoProgressComponent implements OnInit {

  value: number = 0;
  value2: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  valueChange(n: number) {
    this.value += n;
  }

  smallValueChange(n: number) {
    this.value2 += n;
  }
}
