import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {

  @Input()
  label: string;

  @Output()
  onRemove: EventEmitter<any>;

  constructor() {
    this.onRemove = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  remove() {
    this.onRemove.emit();
  }
}
