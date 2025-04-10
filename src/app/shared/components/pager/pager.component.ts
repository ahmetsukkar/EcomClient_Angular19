import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pager',
  imports: [PaginationModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss'
})
export class PagerComponent {
  @Input() totalCount:number;
  @Input() pageSize:number;
  @Output() pageChanged = new EventEmitter<number>();

  onPagerChanged(eventPageNumber: any) {
    console.log("pager event",eventPageNumber);
    this.pageChanged.emit(eventPageNumber);
  }
}
