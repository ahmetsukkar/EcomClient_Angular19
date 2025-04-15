import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbComponent, BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  imports: [BreadcrumbComponent,CommonModule],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {

  constructor(private bcService:BreadcrumbService) { }

  breadcrumb$ : Observable<any[]>;
  ngOnInit() {
    this.breadcrumb$ = this.bcService.breadcrumbs$;
  }
}
