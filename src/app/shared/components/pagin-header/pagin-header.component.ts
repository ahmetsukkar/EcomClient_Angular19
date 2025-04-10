import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagin-header',
  imports: [NgIf],
  templateUrl: './pagin-header.component.html',
  styleUrl: './pagin-header.component.scss'
})
export class PaginHeaderComponent {

  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() totalCount: number;
}
